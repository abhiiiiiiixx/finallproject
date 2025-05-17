import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed, HeartHandshake } from "lucide-react";
import { format } from "date-fns";

interface Redemption {
  type: 'donate' | 'consult';
  cost: number;
  date: string;
  details?: {
    name?: string;
    date?: string;
    time?: string;
    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  };
}

export default function RedemptionHistory() {
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRedemptions = async () => {
      try {
        // Try to fetch from API first
        const response = await fetch('/api/redemptions', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setRedemptions(data);
        } else {
          // Fallback to localStorage
          const localRedemptions = JSON.parse(localStorage.getItem('redemption-history') || '[]');
          setRedemptions(localRedemptions);
        }
      } catch (error) {
        console.error('Failed to fetch redemptions:', error);
        // Fallback to localStorage
        const localRedemptions = JSON.parse(localStorage.getItem('redemption-history') || '[]');
        setRedemptions(localRedemptions);
      } finally {
        setLoading(false);
      }
    };

    fetchRedemptions();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Redemption History</CardTitle>
        <CardDescription>
          Track your token usage and reward history
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : redemptions.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No redemption history yet. Use your tokens to earn rewards!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {redemptions.map((redemption, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {redemption.type === 'donate' ? (
                        <>
                          <UtensilsCrossed className="h-4 w-4 text-amber-500" />
                          <span>Food Donation</span>
                        </>
                      ) : (
                        <>
                          <HeartHandshake className="h-4 w-4 text-blue-500" />
                          <span>Dietitian Consultation</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(redemption.date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>{redemption.cost} Tokens</TableCell>
                  <TableCell>
                    {redemption.type === 'donate' ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Completed
                      </Badge>
                    ) : (
                      <Badge 
                        variant="outline" 
                        className={
                          redemption.details?.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : redemption.details?.status === 'completed'
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                            : redemption.details?.status === 'cancelled'
                            ? 'bg-red-100 text-red-800 hover:bg-red-100'
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                        }
                      >
                        {redemption.details?.status || 'Pending'}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
} 