import { Card, CardContent } from '@/components/ui/card';
import { Brain, Lightbulb, Target, Users } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Развитие логики',
    description: 'Программирование развивает аналитическое мышление и способность решать сложные задачи',
  },
  {
    icon: Lightbulb,
    title: 'Творчество',
    description: 'Дети создают собственные игры, приложения и анимации, выражая свои идеи через код',
  },
  {
    icon: Target,
    title: 'Практика',
    description: 'Каждый урок — это новый проект. Никакой скучной теории, только реальные результаты',
  },
  {
    icon: Users,
    title: 'Поддержка',
    description: 'Опытные наставники помогают на каждом шаге и отвечают на все вопросы',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-foreground">Почему </span>
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              PixelVerse?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Мы верим, что каждый ребёнок — это будущий создатель. Наша миссия — 
            превратить изучение программирования в захватывающее космическое 
            путешествие, где каждый урок открывает новые горизонты.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              variant="glow"
              className="group hover:-translate-y-2 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission statement */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-card to-muted/50 border border-border/50 text-center">
          <blockquote className="text-xl md:text-2xl font-display font-medium text-foreground leading-relaxed max-w-3xl mx-auto">
            «Мы не просто учим программировать — мы открываем детям мир 
            безграничных возможностей, где их фантазия становится реальностью»
          </blockquote>
          <cite className="block mt-4 text-muted-foreground">— Команда PixelVerse</cite>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
