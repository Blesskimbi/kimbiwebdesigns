import { FolderKanban, Star, Clock, Users } from "lucide-react";

const stats = [
  { icon: FolderKanban, value: "50+", label: "Projects Completed" },
  { icon: Star, value: "97%", label: "Client Satisfaction" },
  { icon: Clock, value: "8+", label: "Years Experience" },
  { icon: Users, value: "24h", label: "Response Time" },
];

const StatsBarSection = () => (
  <section className="section-navy py-16 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/10 blur-[100px] pointer-events-none" />
    <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 px-6 relative z-10">
      {stats.map(({ icon: Icon, value, label }) => (
        <div key={label} className="stat-card">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
            <Icon size={22} className="text-gold" />
          </div>
          <div className="font-display font-bold text-3xl md:text-4xl text-white mb-1">{value}</div>
          <div className="font-body text-sm text-white/90">{label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsBarSection;
