import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import logo from "figma:asset/1a83fc5339afc681ed6ad58a4ed81e70b2bcd957.png";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="SolarShare" className="h-16 w-auto" />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                to="/" 
                className={`transition-colors ${isActive('/') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                Accueil
              </Link>
              <Link 
                to="/projets" 
                className={`transition-colors ${isActive('/projets') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                Projets
              </Link>
              <Link 
                to="/tableau-de-bord" 
                className={`transition-colors ${isActive('/tableau-de-bord') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                Mon Dashboard
              </Link>
              <Link 
                to="/comment-ca-marche" 
                className={`transition-colors ${isActive('/comment-ca-marche') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                Comment ça marche
              </Link>
              <Link 
                to="/a-propos" 
                className={`transition-colors ${isActive('/a-propos') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors ${isActive('/contact') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                Contact
              </Link>
              <Link to="/connexion">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link to="/inscription">
                <Button className="bg-primary hover:bg-primary/90">
                  Commencer
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link to="/" className={`block py-2 ${isActive('/') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}>
                Accueil
              </Link>
              <Link to="/projets" className={`block py-2 ${isActive('/projets') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}>
                Projets
              </Link>
              <Link to="/tableau-de-bord" className={`block py-2 ${isActive('/tableau-de-bord') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}>
                Mon Dashboard
              </Link>
              <Link to="/comment-ca-marche" className={`block py-2 ${isActive('/comment-ca-marche') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}>
                Comment ça marche
              </Link>
              <Link to="/a-propos" className={`block py-2 ${isActive('/a-propos') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}>
                À propos
              </Link>
              <Link to="/contact" className={`block py-2 ${isActive('/contact') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}>
                Contact
              </Link>
              <div className="space-y-2 pt-2">
                <Link to="/connexion" className="block">
                  <Button variant="outline" className="w-full">Connexion</Button>
                </Link>
                <Link to="/inscription" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Commencer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <img src={logo} alt="SolarShare" className="h-12 w-auto brightness-0 invert" />
              <p className="text-sm opacity-80">
                La plateforme citoyenne de financement participatif pour l'énergie solaire locale.
              </p>
            </div>

            <div>
              <h4 className="mb-4">Projets</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/projets" className="hover:opacity-100">Projets en cours</Link></li>
                <li><a href="#" className="hover:opacity-100">Projets financés</a></li>
                <li><a href="#" className="hover:opacity-100">Proposer un projet</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/comment-ca-marche" className="hover:opacity-100">Comment ça marche</Link></li>
                <li><a href="#" className="hover:opacity-100">FAQ</a></li>
                <li><a href="#" className="hover:opacity-100">Blog</a></li>
                <li><Link to="/contact" className="hover:opacity-100">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Légal</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100">Mentions légales</a></li>
                <li><a href="#" className="hover:opacity-100">CGU</a></li>
                <li><a href="#" className="hover:opacity-100">Politique de confidentialité</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-background/20 text-center text-sm opacity-80">
            <p>© 2025 SolarShare - Projet P2IP. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
