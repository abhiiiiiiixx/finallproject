import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Modified schema to make fields optional
const personalInfoSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }).optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

interface PersonalInfoStepProps {
  onDataChange: (data: PersonalInfoFormValues) => void;
  defaultValues?: Partial<PersonalInfoFormValues>;
}

const PersonalInfoStep = ({ onDataChange, defaultValues }: PersonalInfoStepProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: defaultValues?.fullName || "",
      gender: defaultValues?.gender || "male",
    },
    mode: "onChange", // Enable validation on change
  });

  // Watch form values to update parent component
  const formValues = watch();
  
  // Watch for form value changes and update parent
  useEffect(() => {
    if (formValues) {
      handleFormChange();
    }
  }, [formValues.fullName, formValues.gender]);
  
  // Set initial data on component mount
  useEffect(() => {
    // Always pass default values to parent component
    const defaultData = {
      fullName: defaultValues?.fullName || "",
      gender: defaultValues?.gender || "male",
    };
    onDataChange(defaultData);
  }, [defaultValues, onDataChange]);
  
  // Update parent component when form values change
  const handleFormChange = () => {
    console.log("Form values:", formValues);
    // Always update with current values, regardless of validation
    const updatedValues = {
      ...formValues,
      // Ensure we always have default values set
      fullName: formValues.fullName || "",
      gender: formValues.gender || "male"
    };
    onDataChange(updatedValues);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
        <p className="text-muted-foreground">Let's start with your name and gender</p>
        <p className="text-sm text-muted-foreground mt-2">(All fields are optional - default values will be used if skipped)</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Your full name"
            {...register("fullName", {
              onChange: (e) => {
                console.log("Name input changed:", e.target.value);
                handleFormChange();
              }
            })}
            className="mt-1"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label>Gender</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  handleFormChange();
                }}
                value={field.value}
                className="grid grid-cols-3 gap-4 mt-3"
              >
                <div className={`flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-fitness-primary cursor-pointer ${field.value === 'male' ? 'border-fitness-primary bg-fitness-primary/10' : ''}`}>
                  <RadioGroupItem value="male" id="male" className="self-start" />
                  <div className="text-2xl">👨</div>
                  <Label htmlFor="male" className="cursor-pointer">Male</Label>
                </div>
                <div className={`flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-fitness-primary cursor-pointer ${field.value === 'female' ? 'border-fitness-primary bg-fitness-primary/10' : ''}`}>
                  <RadioGroupItem value="female" id="female" className="self-start" />
                  <div className="text-2xl">👩</div>
                  <Label htmlFor="female" className="cursor-pointer">Female</Label>
                </div>
                <div className={`flex flex-col items-center space-y-2 border rounded-lg p-4 hover:border-fitness-primary cursor-pointer ${field.value === 'other' ? 'border-fitness-primary bg-fitness-primary/10' : ''}`}>
                  <RadioGroupItem value="other" id="other" className="self-start" />
                  <div className="text-2xl">🧑</div>
                  <Label htmlFor="other" className="cursor-pointer">Other</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.gender && (
            <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
