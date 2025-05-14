
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const dietSchema = z.object({
  dietPreference: z.enum(["vegetarian", "non-vegetarian", "semi-vegetarian"]),
  healthGoal: z.enum(["weight-loss", "weight-gain", "maintenance"]),
  sleepPattern: z.enum(["less-than-6", "6-to-8", "more-than-8"]),
  medicalConditions: z.array(z.string()).optional(),
});

type DietFormValues = z.infer<typeof dietSchema>;

interface DietGoalsStepProps {
  onDataChange: (data: DietFormValues) => void;
  defaultValues?: Partial<DietFormValues>;
}

const medicalConditionOptions = [
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "Hypertension" },
  { id: "heart-disease", label: "Heart Disease" },
  { id: "cholesterol", label: "High Cholesterol" },
  { id: "thyroid", label: "Thyroid Issues" },
  { id: "pcos", label: "PCOS" },
  { id: "ibs", label: "IBS/Digestive Issues" },
  { id: "none", label: "None of the above" },
];

const DietGoalsStep = ({ onDataChange, defaultValues }: DietGoalsStepProps) => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<DietFormValues>({
    resolver: zodResolver(dietSchema),
    defaultValues: {
      dietPreference: defaultValues?.dietPreference || "non-vegetarian",
      healthGoal: defaultValues?.healthGoal || "weight-loss",
      sleepPattern: defaultValues?.sleepPattern || "6-to-8",
      medicalConditions: defaultValues?.medicalConditions || [],
    },
  });

  // Watch form values to update parent component
  const formValues = watch();
  
  // Update parent component when form values change
  const handleFormChange = () => {
    const isValid = !errors.dietPreference && !errors.healthGoal && !errors.sleepPattern;
    if (isValid) {
      onDataChange(formValues);
    }
  };

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

  return (
    <div onChange={handleFormChange} className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Diet & Health Goals</h2>
        <p className="text-muted-foreground">Let's customize your plan according to your preferences</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-lg font-medium">What's your diet preference?</Label>
          <Controller
            name="dietPreference"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex flex-col items-center justify-center border rounded-xl p-5 hover:border-fitness-primary cursor-pointer">
                  <div className="text-2xl mb-2">🥦</div>
                  <RadioGroupItem value="vegetarian" id="vegetarian" className="sr-only" />
                  <Label htmlFor="vegetarian" className="cursor-pointer font-medium">Vegetarian</Label>
                  <p className="text-xs text-muted-foreground text-center mt-1">No meat, fish, or animal products</p>
                </div>
                <div className="flex flex-col items-center justify-center border rounded-xl p-5 hover:border-fitness-primary cursor-pointer">
                  <div className="text-2xl mb-2">🍗</div>
                  <RadioGroupItem value="non-vegetarian" id="non-vegetarian" className="sr-only" />
                  <Label htmlFor="non-vegetarian" className="cursor-pointer font-medium">Non-Vegetarian</Label>
                  <p className="text-xs text-muted-foreground text-center mt-1">Include all types of food</p>
                </div>
                <div className="flex flex-col items-center justify-center border rounded-xl p-5 hover:border-fitness-primary cursor-pointer">
                  <div className="text-2xl mb-2">🥗</div>
                  <RadioGroupItem value="semi-vegetarian" id="semi-vegetarian" className="sr-only" />
                  <Label htmlFor="semi-vegetarian" className="cursor-pointer font-medium">Semi-Vegetarian</Label>
                  <p className="text-xs text-muted-foreground text-center mt-1">Mostly plant-based with some animal products</p>
                </div>
              </RadioGroup>
            )}
          />
          {errors.dietPreference && (
            <p className="text-sm text-red-500">{errors.dietPreference.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-medium">What's your primary health goal?</Label>
          <Controller
            name="healthGoal"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex flex-col items-center justify-center border rounded-xl p-5 hover:border-fitness-primary cursor-pointer">
                  <div className="text-2xl mb-2">⬇️</div>
                  <RadioGroupItem value="weight-loss" id="weight-loss" className="sr-only" />
                  <Label htmlFor="weight-loss" className="cursor-pointer font-medium">Weight Loss</Label>
                  <p className="text-xs text-muted-foreground text-center mt-1">Reduce body fat and weight</p>
                </div>
                <div className="flex flex-col items-center justify-center border rounded-xl p-5 hover:border-fitness-primary cursor-pointer">
                  <div className="text-2xl mb-2">⬆️</div>
                  <RadioGroupItem value="weight-gain" id="weight-gain" className="sr-only" />
                  <Label htmlFor="weight-gain" className="cursor-pointer font-medium">Weight Gain</Label>
                  <p className="text-xs text-muted-foreground text-center mt-1">Build muscle and increase weight</p>
                </div>
                <div className="flex flex-col items-center justify-center border rounded-xl p-5 hover:border-fitness-primary cursor-pointer">
                  <div className="text-2xl mb-2">⚖️</div>
                  <RadioGroupItem value="maintenance" id="maintenance" className="sr-only" />
                  <Label htmlFor="maintenance" className="cursor-pointer font-medium">Maintenance</Label>
                  <p className="text-xs text-muted-foreground text-center mt-1">Maintain current weight and improve health</p>
                </div>
              </RadioGroup>
            )}
          />
          {errors.healthGoal && (
            <p className="text-sm text-red-500">{errors.healthGoal.message}</p>
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
                defaultValue={field.value}
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
