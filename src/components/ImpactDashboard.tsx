import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const energyData = [
  { month: "Jan", energie: 2400, co2: 180 },
  { month: "Fév", energie: 2800, co2: 210 },
  { month: "Mar", energie: 3200, co2: 240 },
  { month: "Avr", energie: 3600, co2: 270 },
  { month: "Mai", energie: 4100, co2: 308 },
  { month: "Juin", energie: 4500, co2: 338 },
];

const revenueData = [
  { month: "Jan", revenu: 120 },
  { month: "Fév", revenu: 140 },
  { month: "Mar", revenu: 160 },
  { month: "Avr", revenu: 180 },
  { month: "Mai", revenu: 205 },
  { month: "Juin", revenu: 225 },
];

export function ImpactDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tableau de bord d'impact</CardTitle>
        <p className="text-muted-foreground">
          Suivez en temps réel l'impact de vos investissements
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="energy" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="energy">Énergie & CO₂</TabsTrigger>
            <TabsTrigger value="revenue">Revenus</TabsTrigger>
          </TabsList>
          
          <TabsContent value="energy" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8f3ea" />
                  <XAxis dataKey="month" stroke="#5a6c5b" />
                  <YAxis stroke="#5a6c5b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid rgba(45, 122, 62, 0.15)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="energie" 
                    stroke="#2d7a3e" 
                    fill="#2d7a3e" 
                    fillOpacity={0.2}
                    name="Énergie produite (kWh)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="co2" 
                    stroke="#f9a825" 
                    fill="#f9a825" 
                    fillOpacity={0.2}
                    name="CO₂ évité (kg)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Énergie totale produite</p>
                <p className="text-2xl mt-1">20 600 kWh</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">CO₂ total évité</p>
                <p className="text-2xl mt-1">1 546 kg</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="revenue" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8f3ea" />
                  <XAxis dataKey="month" stroke="#5a6c5b" />
                  <YAxis stroke="#5a6c5b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid rgba(45, 122, 62, 0.15)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="revenu" 
                    fill="#2d7a3e" 
                    radius={[8, 8, 0, 0]}
                    name="Revenu (€)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Revenu total généré</p>
                <p className="text-2xl mt-1">1 030 €</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Rendement moyen</p>
                <p className="text-2xl mt-1">4.2%</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
