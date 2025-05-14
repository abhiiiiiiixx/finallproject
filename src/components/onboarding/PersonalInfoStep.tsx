
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const personalInfoSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 18 && num <= 100;
  }, { message: "Age must be between 18 and 100" }),
  gender: z.enum(["male", "female", "other"]),
  height: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 100 && num <= 250;
  }, { message: "Height must be between 100 and 250 cm" }),
  weight: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 30 && num <= 300;
  }, { message: "Weight must be between 30 and 300 kg" }),
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
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: defaultValues?.fullName || "",
      age: defaultValues?.age || "",
      gender: defaultValues?.gender || "male",
      height: defaultValues?.height || "",
      weight: defaultValues?.weight || "",
    },
  });

  // Watch form values to update parent component
  const formValues = watch();
  
  // Update parent component when form values change
  const handleFormChange = () => {
    const isValid = !errors.fullName && !errors.age && !errors.gender && !errors.height && !errors.weight;
    if (isValid) {
      onDataChange(formValues);
    }
  };

  return (
    <div onChange={handleFormChange} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
        <p className="text-muted-foreground">We need some basic information to create your personalized plan</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Your full name"
            {...register("fullName")}
            className="mt-1"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Years"
              {...register("age")}
              className="mt-1"
            />
            {errors.age && (
              <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>
            )}
          </div>

          <div>
            <Label>Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4 mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Height in cm"
              {...register("height")}
              className="mt-1"
            />
            {errors.height && (
              <p className="text-sm text-red-500 mt-1">{errors.height.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Weight in kg"
              {...register("weight")}
              className="mt-1"
            />
            {errors.weight && (
              <p className="text-sm text-red-500 mt-1">{errors.weight.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
