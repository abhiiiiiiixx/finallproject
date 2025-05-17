import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock, HeartHandshake, UtensilsCrossed } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useTokens } from "@/lib/TokenContext";

const DONATE_COST = 10;
const CONSULT_COST = 30;

export default function RedeemTokens() {
  const { tokens, setTokens } = useTokens();
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [goals, setGoals] = useState("");
  const [showDonateAnimation, setShowDonateAnimation] = useState(false);
  const [showConsultSuccess, setShowConsultSuccess] = useState(false);
  const [consultDialogOpen, setConsultDialogOpen] = useState(false);

  const handleDonateFood = () => {
    if (tokens < DONATE_COST) {
      toast({
        title: "Not enough tokens",
        description: "Earn more tokens to unlock this reward!",
        variant: "destructive"
      });
      return;
    }

    // Deduct tokens
    setTokens(tokens - DONATE_COST);
    
    // Save to local storage
    localStorage.setItem("fitness-tokens", String(tokens - DONATE_COST));
    
    // Show animation
    setShowDonateAnimation(true);
    setTimeout(() => setShowDonateAnimation(false), 3000);
    
    // Record redemption in history (could be sent to backend)
    const redemption = {
      type: "donate",
      cost: DONATE_COST,
      date: new Date().toISOString()
    };
    
    const history = JSON.parse(localStorage.getItem("redemption-history") || "[]");
    history.push(redemption);
    localStorage.setItem("redemption-history", JSON.stringify(history));
    
    toast({
      title: "Thank you!",
      description: "You've helped someone eat today!"
    });
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (tokens < CONSULT_COST) {
      toast({
        title: "Not enough tokens",
        description: "Earn more tokens to unlock this reward!",
        variant: "destructive"
      });
      return;
    }
    
    if (!name || !date || !time || !goals) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields to book your consultation.",
        variant: "destructive"
      });
      return;
    }
    
    // Deduct tokens
    setTokens(tokens - CONSULT_COST);
    
    // Save to local storage
    localStorage.setItem("fitness-tokens", String(tokens - CONSULT_COST));
    
    // Record booking (could be sent to backend)
    const booking = {
      type: "consult",
      cost: CONSULT_COST,
      name,
      date: date?.toISOString(),
      time,
      goals,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    
    const bookings = JSON.parse(localStorage.getItem("consult-bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("consult-bookings", JSON.stringify(bookings));
    
    // Record in redemption history
    const redemption = {
      type: "consult",
      cost: CONSULT_COST,
      date: new Date().toISOString()
    };
    
    const history = JSON.parse(localStorage.getItem("redemption-history") || "[]");
    history.push(redemption);
    localStorage.setItem("redemption-history", JSON.stringify(history));
    
    // Clear form
    setName("");
    setDate(undefined);
    setTime("");
    setGoals("");
    setConsultDialogOpen(false);
    
    // Show success message
    setShowConsultSuccess(true);
    setTimeout(() => setShowConsultSuccess(false), 3000);
    
    toast({
      title: "Consultation Booked!",
      description: "Check your email for confirmation details."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Redeem Your Tokens</CardTitle>
          <CardDescription>
            Use your earned tokens to unlock special rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Donate Food Option */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader className="bg-amber-50 dark:bg-amber-900/20 rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <UtensilsCrossed className="h-6 w-6 text-amber-600" />
                  <CardTitle>Donate Food</CardTitle>
                </div>
                <CardDescription>Help someone in need</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Use your tokens to donate a meal to someone experiencing food insecurity.
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold">{DONATE_COST} Tokens</span>
                  <span className={`text-sm ${tokens >= DONATE_COST ? 'text-green-600' : 'text-red-500'}`}>
                    {tokens >= DONATE_COST ? 'Available' : 'Not enough tokens'}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <div className="text-sm text-muted-foreground">
                  {Math.max(tokens - DONATE_COST, 0)} tokens remaining after redemption
                </div>
                <Button 
                  onClick={handleDonateFood} 
                  disabled={tokens < DONATE_COST}
                >
                  Donate
                </Button>
              </CardFooter>
            </Card>

            {/* Consult a Dietitian Option */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20 rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <HeartHandshake className="h-6 w-6 text-blue-600" />
                  <CardTitle>Consult a Dietitian</CardTitle>
                </div>
                <CardDescription>Get professional advice</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Book a 30-minute personalized consultation with a professional dietitian.
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold">{CONSULT_COST} Tokens</span>
                  <span className={`text-sm ${tokens >= CONSULT_COST ? 'text-green-600' : 'text-red-500'}`}>
                    {tokens >= CONSULT_COST ? 'Available' : 'Not enough tokens'}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <div className="text-sm text-muted-foreground">
                  {Math.max(tokens - CONSULT_COST, 0)} tokens remaining after redemption
                </div>
                <Dialog open={consultDialogOpen} onOpenChange={setConsultDialogOpen}>
                  <DialogTrigger asChild>
                    <Button disabled={tokens < CONSULT_COST}>
                      Book Consultation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleConsultSubmit}>
                      <DialogHeader>
                        <DialogTitle>Book a Dietitian Consultation</DialogTitle>
                        <DialogDescription>
                          Fill out the form below to schedule your 30-minute consultation.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Preferred Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : "Select a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                disabled={(date) => 
                                  date < new Date() || 
                                  date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="time">Preferred Time</Label>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="time"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                              placeholder="e.g., 2:00 PM"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="goals">Your Goals</Label>
                          <Textarea
                            id="goals"
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            placeholder="Briefly describe what you'd like to discuss in your consultation"
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Book for {CONSULT_COST} Tokens</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Donation Animation */}
      <AnimatePresence>
        {showDonateAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center max-w-md"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div 
                className="w-32 h-32 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  repeat: 2,
                  duration: 1 
                }}
              >
                <motion.div className="text-7xl">🍲</motion.div>
              </motion.div>
              <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
              <p className="text-lg mb-6">You've helped someone eat today!</p>
              <Button 
                onClick={() => setShowDonateAnimation(false)}
                className="w-full"
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consultation Success Animation */}
      <AnimatePresence>
        {showConsultSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center max-w-md"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div 
                className="w-32 h-32 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: 1
                }}
              >
                <motion.div className="text-7xl">📅</motion.div>
              </motion.div>
              <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
              <p className="text-lg mb-2">Your consultation has been scheduled.</p>
              <p className="text-sm text-muted-foreground mb-6">Check your email for confirmation details.</p>
              <Button 
                onClick={() => setShowConsultSuccess(false)}
                className="w-full"
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 