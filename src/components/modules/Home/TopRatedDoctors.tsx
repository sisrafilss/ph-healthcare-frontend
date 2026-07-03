import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import cardioDoc from '../../../assets/images/doctor-cardiologist.jpg';
import neurolDoc from '../../../assets/images/doctor-neurologist.jpg';
import orthoDoc from '../../../assets/images/doctor-orthopedic.jpg';

const doctors = [
  {
    name: 'Dr. Cameron Williamson',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 23,
    image: cardioDoc,
  },
  {
    name: 'Dr. Leslie Alexander',
    specialty: 'Neurologist',
    rating: 4.8,
    reviews: 45,
    image: neurolDoc,
  },
  {
    name: 'Dr. Robert Fox',
    specialty: 'Orthopedic',
    rating: 4.9,
    reviews: 32,
    image: orthoDoc,
  },
];

const DoctorCard = ({ doctor }: { doctor: (typeof doctors)[0] }) => {
  return (
    <Card className="overflow-hidden text-center transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="items-center bg-blue-50/50 p-6">
        <Image
          src={doctor.image}
          alt={doctor.name}
          width={96}
          height={96}
          className="rounded-full border-4 border-white shadow-md"
        />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-lg">{doctor.name}</CardTitle>
        <p className="text-primary mt-1 font-medium">{doctor.specialty}</p>
        <div className="my-3 flex items-center justify-center text-sm">
          <Star className="fill-current text-yellow-400" size={16} />
          <span className="text-foreground ml-2 font-semibold">{doctor.rating}</span>
          <span className="text-muted-foreground ml-2">({doctor.reviews} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        <Button variant="outline">View Profile</Button>
        <Button>Book Now</Button>
      </CardFooter>
    </Card>
  );
};

const TopRatedDoctors = () => {
  return (
    <section className="bg-blue-50/50 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold">Our Top Rated Doctor</h2>
          <p className="text-muted-foreground mt-4">
            Access to medical experts from various specialities, ready to provide you with top-notch
            medical services.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.name} doctor={doctor} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg">View All Doctors</Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
