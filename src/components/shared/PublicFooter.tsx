'use client';

import Link from 'next/link';

function PublicFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-2 font-bold">PH Doc</h3>
            <p className="text-muted-foreground text-sm">
              Your health is our priority. We are here to provide the best medical services.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Contact Us</h3>
            <p className="text-muted-foreground text-sm">
              123 Medical Lane
              <br />
              Health City, HC 12345
              <br />
              contact@phdoc.com
            </p>
          </div>
        </div>
        <div className="text-muted-foreground mt-8 border-t pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} PH Doc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
export default PublicFooter;
