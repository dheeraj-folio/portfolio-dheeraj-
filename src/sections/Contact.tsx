import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Linkedin, Github, Twitter } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !heading || !form || !info) return;

    // Heading animation
    gsap.fromTo(
      heading.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Form animation
    gsap.fromTo(
      form,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: form,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Info animation
    gsap.fromTo(
      info.children,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: info,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-32 bg-cyber-dark overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-green/30 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headingRef} className="max-w-7xl mx-auto mb-20 text-center">
          <span className="text-cyber-green text-sm tracking-[0.3em] uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-section font-bold text-white mb-4">
            LET&apos;S TALK<span className="text-cyber-green">.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Have a project in mind? Let&apos;s create something amazing together.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Name Input */}
            <div className="relative group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:border-cyber-green focus:outline-none transition-colors peer"
                placeholder="Name"
              />
              <label className="absolute left-0 top-4 text-white/50 transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyber-green peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                Your Name
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-cyber-green transition-all duration-300 group-hover:w-full peer-focus:w-full" />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:border-cyber-green focus:outline-none transition-colors peer"
                placeholder="Email"
              />
              <label className="absolute left-0 top-4 text-white/50 transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyber-green peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                Your Email
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-cyber-green transition-all duration-300 group-hover:w-full peer-focus:w-full" />
            </div>

            {/* Message Input */}
            <div className="relative group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:border-cyber-green focus:outline-none transition-colors peer resize-none"
                placeholder="Message"
              />
              <label className="absolute left-0 top-4 text-white/50 transition-all duration-300 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-cyber-green peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                Your Message
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-cyber-green transition-all duration-300 group-hover:w-full peer-focus:w-full" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-cyber-green text-cyber-dark font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </span>
              <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyber-green/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-cyber-green" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email</h4>
                  <a
                    href="mailto:dheeraj.folio@gmail.com"
                    className="text-white/60 hover:text-cyber-green transition-colors"
                  >
                    dheeraj.folio@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyber-green/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-cyber-green" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Phone</h4>
                  <a
                    href="tel:+91 97849 58368"
                    className="text-white/60 hover:text-cyber-green transition-colors"
                  >
                   +91 97849 58368
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyber-green/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-cyber-green" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Location</h4>
                  <p className="text-white/60">
                    Pratap Nagar, Sanganer, Jaipur
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10">
              <h4 className="text-white font-medium mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="group w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyber-green hover:border-cyber-green transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white/60 group-hover:text-cyber-dark transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 glass rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-green" />
              </span>
              <span className="text-sm text-white/80">
                Available for new projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
