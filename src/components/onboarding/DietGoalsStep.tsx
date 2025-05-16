import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const dietSchema = z.object({
  age: z.number().min(5, "Age must be at least 5 years").optional(),
  height: z.number().min(1, "Height is required").optional(),
  weight: z.number().min(1, "Weight is required").optional(),
  dietPreference: z.enum(["vegetarian", "non-vegetarian", "semi-vegetarian"]).optional(),
  healthGoal: z.enum(["weight-loss", "weight-gain", "maintenance"]).optional(),
  sleepPattern: z.enum(["less-than-6", "6-to-8", "more-than-8"]).optional(),
  medicalConditions: z.array(z.string()).optional(),
});

type DietFormValues = z.infer<typeof dietSchema>;

interface DietGoalsStepProps {
  onDataChange: (data: DietFormValues) => void;
  defaultValues?: Partial<DietFormValues>;
}

const medicalConditionOptions = [
  { id: "diabetes", label: "Diabetes" },
  { id: "heart-disease", label: "Heart Disease" },
  { id: "cholesterol", label: "High Cholesterol" },
  { id: "ibs", label: "IBS/Digestive Issues" },
  { id: "none", label: "None of the above" },
];

const DietGoalsStep = ({ onDataChange, defaultValues }: DietGoalsStepProps) => {
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>("");

  const {
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
    register,
  } = useForm<DietFormValues>({
    resolver: zodResolver(dietSchema),
    defaultValues: {
      age: defaultValues?.age || undefined,
      height: defaultValues?.height || undefined,
      weight: defaultValues?.weight || undefined,
      dietPreference: defaultValues?.dietPreference || "non-vegetarian",
      healthGoal: defaultValues?.healthGoal || "weight-loss",
      sleepPattern: defaultValues?.sleepPattern || "6-to-8",
      medicalConditions: defaultValues?.medicalConditions || [],
    },
  });

  // Watch height and weight for BMI calculation
  const height = watch("height");
  const weight = watch("weight");

  // Calculate BMI when height or weight changes
  useEffect(() => {
    console.log("Height:", height, "Weight:", weight); // Debug log
    
    // Ensure we have valid numeric values
    if (
      height && 
      weight && 
      !isNaN(height) && 
      !isNaN(weight) && 
      height > 0 && 
      weight > 0
    ) {
      // BMI formula: weight(kg) / (height(m) * height(m))
      // Assuming height is in cm, convert to meters
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      const roundedBmi = parseFloat(bmiValue.toFixed(1));
      console.log("Calculated BMI:", roundedBmi); // Debug log
      setBmi(roundedBmi);
      
      // Determine BMI category
      if (bmiValue < 18.5) {
        setBmiCategory("Underweight");
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setBmiCategory("Normal");
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setBmiCategory("Overweight");
      } else {
        setBmiCategory("Obese");
      }
    } else {
      setBmi(null);
      setBmiCategory("");
    }
  }, [height, weight]);

  // Watch form values to update parent component
  const formValues = watch();
  
  // Update parent component when form values change
  const handleFormChange = () => {
    // Always set default values for required fields
    const updatedValues = {
      ...formValues,
      dietPreference: formValues.dietPreference || "non-vegetarian",
      healthGoal: formValues.healthGoal || "weight-loss",
      sleepPattern: formValues.sleepPattern || "6-to-8"
    };
    
    // Send the updated values to the parent component
    onDataChange(updatedValues);
  };

  // Set initial data on component mount
  useEffect(() => {
    // Always pass default values to parent component
    const defaultData = {
      dietPreference: "non-vegetarian",
      healthGoal: "weight-loss",
      sleepPattern: "6-to-8",
      medicalConditions: [],
      ...defaultValues
    };
    onDataChange(defaultData);
  }, []);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const currentValues = getValues("medicalConditions") || [];
    
    if (id === "none" && checked) {
      // If "None of the above" is checked, uncheck all others
      setValue("medicalConditions", ["none"], { shouldValidate: true });
    } else if (checked) {
      // If any other condition is checked, remove "None" if it's there
      const newValues = currentValues.filter(v => v !== "none").concat(id);
      setValue("medicalConditions", newValues, { shouldValidate: true });
    } else {
      // If a condition is unchecked, just remove it
      setValue(
        "medicalConditions",
        currentValues.filter(v => v !== id),
        { shouldValidate: true }
      );
    }
    
    // Trigger form change after updating
    setTimeout(handleFormChange, 0);
  };

  // Add a function to explicitly calculate BMI
  const calculateBMI = () => {
    if (height && weight && !isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      const roundedBmi = parseFloat(bmiValue.toFixed(1));
      setBmi(roundedBmi);
      
      // Determine BMI category
      if (bmiValue < 18.5) {
        setBmiCategory("Underweight");
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setBmiCategory("Normal");
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setBmiCategory("Overweight");
      } else {
        setBmiCategory("Obese");
      }
    }
  };

  return (
    <div onChange={handleFormChange} className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Health Information</h2>
        <p className="text-muted-foreground">Let's gather some basic health details to customize your plan</p>
        <p className="text-sm text-muted-foreground mt-2">(All fields are optional - default values will be used for any skipped sections)</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-lg font-medium">Your Basic Information</Label>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (minimum 5 years)</Label>
              <Input
                id="age"
                type="number"
                min="5"
                placeholder="Enter your age (5+ years)"
                {...register("age", { 
                  valueAsNumber: true,
                  onChange: (e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val) && val >= 5) {
                      setValue("age", val, { shouldValidate: true });
                      handleFormChange();
                    }
                  }
                })}
              />
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  min="1"
                  placeholder="Enter your height in cm"
                  {...register("height", { 
                    valueAsNumber: true,
                    onChange: (e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val) && val > 0) {
                        setValue("height", val, { shouldValidate: true });
                        handleFormChange();
                      }
                    }
                  })}
                />
                {errors.height && (
                  <p className="text-sm text-red-500">{errors.height.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="1"
                  placeholder="Enter your weight in kg"
                  {...register("weight", { 
                    valueAsNumber: true,
                    onChange: (e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val) && val > 0) {
                        setValue("weight", val, { shouldValidate: true });
                        handleFormChange();
                      }
                    }
                  })}
                />
                {errors.weight && (
                  <p className="text-sm text-red-500">{errors.weight.message}</p>
                )}
              </div>
            </div>
            
            <button
              type="button"
              onClick={calculateBMI}
              className="mt-2 py-2 px-4 bg-fitness-primary text-white rounded-md hover:bg-fitness-primary/90 transition"
            >
              Calculate BMI
            </button>
          </div>
          
          {bmi && (
            <motion.div 
              className="mt-4 p-4 rounded-lg bg-fitness-primary/10 border border-fitness-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Your BMI</h3>
                  <p className="text-sm text-muted-foreground">Body Mass Index</p>
                </div>
                <div className="text-right">
                  <motion.span 
                    className="text-2xl font-bold text-fitness-primary"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {bmi}
                  </motion.span>
                  <p className="text-sm font-medium">{bmiCategory}</p>
                </div>
              </div>
              <motion.div 
                className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${Math.min(bmi * 2, 100)}%`,
                    backgroundColor: 
                      bmiCategory === "Underweight" ? "#3b82f6" :
                      bmiCategory === "Normal" ? "#10b981" :
                      bmiCategory === "Overweight" ? "#f59e0b" : "#ef4444"
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(bmi * 2, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.div>
            </motion.div>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-medium">How many hours do you sleep at night?</Label>
          <Controller
            name="sleepPattern"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-fitness-primary cursor-pointer">
                  <RadioGroupItem value="less-than-6" id="less-than-6" />
                  <Label htmlFor="less-than-6" className="cursor-pointer flex flex-col">
                    <span>Less than 6 hours</span>
                    <span className="text-xs text-muted-foreground">Short sleep duration</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-fitness-primary cursor-pointer">
                  <RadioGroupItem value="6-to-8" id="6-to-8" />
                  <Label htmlFor="6-to-8" className="cursor-pointer flex flex-col">
                    <span>6 to 8 hours</span>
                    <span className="text-xs text-muted-foreground">Recommended amount</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-fitness-primary cursor-pointer">
                  <RadioGroupItem value="more-than-8" id="more-than-8" />
                  <Label htmlFor="more-than-8" className="cursor-pointer flex flex-col">
                    <span>More than 8 hours</span>
                    <span className="text-xs text-muted-foreground">Extended sleep duration</span>
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.sleepPattern && (
            <p className="text-sm text-red-500">{errors.sleepPattern.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-medium">Do you have any medical conditions? (Select all that apply)</Label>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {medicalConditionOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 border rounded-lg p-3 hover:border-fitness-primary">
                <Controller
                  name="medicalConditions"
                  control={control}
                  render={({ field }) => {
                    const currentValues = field.value || [];
                    const isChecked = currentValues.includes(option.id);
                    
                    return (
                      <Checkbox
                        id={option.id}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          handleCheckboxChange(option.id, checked === true);
                        }}
                      />
                    );
                  }}
                />
                <Label htmlFor={option.id} className="cursor-pointer text-sm">{option.label}</Label>
              </div>
            ))}
          </div>
          {errors.medicalConditions && (
            <p className="text-sm text-red-500">Please select at least one option</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietGoalsStep;
