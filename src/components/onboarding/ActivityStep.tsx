
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarbellIcon, ClockIcon, HeartIcon } from "lucide-react";

const activitySchema = z.object({
  activityStatus: z.enum(["student", "professional", "other"]),
  workingHours: z.string(),
  workoutDuration: z.string(),
  workoutIntensity: z.coerce.number().min(1).max(5),
});

type ActivityFormValues = z.infer<typeof activitySchema>;

interface ActivityStepProps {
  onDataChange: (data: ActivityFormValues) => void;
  defaultValues?: Partial<ActivityFormValues>;
}

const ActivityStep = ({ onDataChange, defaultValues }: ActivityStepProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      activityStatus: defaultValues?.activityStatus || "professional",
      workingHours: defaultValues?.workingHours || "8",
      workoutDuration: defaultValues?.workoutDuration || "30-60",
      workoutIntensity: defaultValues?.workoutIntensity || 3,
    },
  });

  // Watch form values to update parent component
  const formValues = watch();
  
  // Update parent component when form values change
  const handleFormChange = () => {
    const isValid = !errors.activityStatus && !errors.workingHours && !errors.workoutDuration && !errors.workoutIntensity;
    if (isValid) {
      onDataChange(formValues);
    }
  };

  return (
    <div onChange={handleFormChange} className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Activity Profile</h2>
        <p className="text-muted-foreground">Help us understand your daily activity level</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>What best describes your current status?</Label>
          <Controller
            name="activityStatus"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-fitness-primary cursor-pointer">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="cursor-pointer flex flex-col">
                    <span>Student</span>
                    <span className="text-sm text-muted-foreground">College/University</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-fitness-primary cursor-pointer">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional" className="cursor-pointer flex flex-col">
                    <span>Professional</span>
                    <span className="text-sm text-muted-foreground">Working full/part time</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-fitness-primary cursor-pointer">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="cursor-pointer flex flex-col">
                    <span>Other</span>
                    <span className="text-sm text-muted-foreground">Homemaker/Retired</span>
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.activityStatus && (
            <p className="text-sm text-red-500">{errors.activityStatus.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-fitness-primary" />
            <Label htmlFor="workingHours">How many hours do you work/study daily?</Label>
          </div>
          <Controller
            name="workingHours"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">Less than 4 hours</SelectItem>
                  <SelectItem value="6">4-6 hours</SelectItem>
                  <SelectItem value="8">6-8 hours</SelectItem>
                  <SelectItem value="10">8-10 hours</SelectItem>
                  <SelectItem value="12">More than 10 hours</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.workingHours && (
            <p className="text-sm text-red-500">{errors.workingHours.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BarbellIcon className="h-5 w-5 text-fitness-secondary" />
            <Label htmlFor="workoutDuration">How long do you typically exercise?</Label>
          </div>
          <Controller
            name="workoutDuration"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">I don't exercise regularly</SelectItem>
                  <SelectItem value="15-30">15-30 minutes</SelectItem>
                  <SelectItem value="30-60">30-60 minutes</SelectItem>
                  <SelectItem value="60-90">60-90 minutes</SelectItem>
                  <SelectItem value="90+">More than 90 minutes</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.workoutDuration && (
            <p className="text-sm text-red-500">{errors.workoutDuration.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HeartIcon className="h-5 w-5 text-fitness-accent" />
            <Label>How intense are your workouts?</Label>
          </div>
          <div className="space-y-6 pt-2">
            <Controller
              name="workoutIntensity"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Slider
                    defaultValue={[value]}
                    max={5}
                    min={1}
                    step={1}
                    onValueChange={(vals) => onChange(vals[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Light activity<br/>(Easy walking)</span>
                    <span>Moderate<br/>(Light cardio)</span>
                    <span>Challenging<br/>(Heavy lifting)</span>
                  </div>
                </>
              )}
            />
            {errors.workoutIntensity && (
              <p className="text-sm text-red-500">{errors.workoutIntensity.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityStep;
