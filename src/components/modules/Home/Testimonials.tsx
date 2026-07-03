import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import samplePhoto from '../../../assets/images/hero-doctor.jpg';

const testimonials = [
  {
    name: 'Robert Fox',
    role: 'Patient',
    image: samplePhoto,
    quote:
      'The care and professionalism I received were outstanding. The doctors were knowledgeable and the staff was incredibly supportive throughout my treatment.',
    rating: 5,
  },
  {
    name: 'Jane Cooper',
    role: 'Patient',
    image: samplePhoto,
    quote:
      'A seamless experience from booking an appointment to the consultation. The use of technology for prescriptions and follow-ups is very convenient.',
    rating: 5,
  },
  {
    name: 'Wade Warren',
    role: 'Patient',
    image: samplePhoto,
    quote:
      'I highly recommend their services. The specialists are top-notch, and they truly focus on preventive care which has greatly improved my health.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-card py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold">What Our Client Says</h2>
          <p className="text-muted-foreground mt-4">
            We are committed to providing you with the best medical and healthcare services.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-background relative">
              <CardContent className="p-8">
                <Quote className="text-primary absolute top-4 left-4" size={48} />
                <div className="relative z-10">
                  <p className="text-muted-foreground mb-6">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="text-foreground font-bold">{testimonial.name}</h4>
                      <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                      <div className="mt-1 flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="fill-current text-yellow-400" size={16} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
