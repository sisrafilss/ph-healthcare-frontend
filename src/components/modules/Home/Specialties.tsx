import { HeartPulse, Brain, Bone, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const specialists = [
  {
    name: 'Cardiology',
    icon: HeartPulse,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-500',
  },
  {
    name: 'Neurology',
    icon: Brain,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    name: 'Orthopedic',
    icon: Bone,
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-500',
  },
  {
    name: 'Pediatric',
    icon: Baby,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500',
  },
];

const Specialities = () => {
  return (
    <section className="mt-24 py-24 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div>
            <h2 className="text-foreground text-3xl font-bold">Our Specialist</h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              Access to medical experts across all major specialities.
            </p>
          </div>
          <a href="#" className="text-primary mt-4 font-semibold hover:underline sm:mt-0">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specialists.map((specialist) => (
            <Card
              key={specialist.name}
              className={cn(
                'hover:bg-primary hover:text-primary-foreground cursor-pointer text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
              )}
            >
              <CardContent className="p-6">
                <div
                  className={cn(
                    'mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'
                  )}
                >
                  <specialist.icon className={cn(specialist.iconColor)} size={32} />
                </div>
                <h3 className="text-lg font-semibold">{specialist.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialities;
