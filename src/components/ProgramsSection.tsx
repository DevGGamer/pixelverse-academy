import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, Gamepad2, Globe, Palette, Cpu, Smartphone } from 'lucide-react';

const programs = [
  {
    icon: Gamepad2,
    title: 'Создание игр',
    age: '8-10 лет',
    level: 'Начинающий',
    description: 'Первые шаги в программировании через создание простых игр в Scratch и Roblox Studio',
    skills: ['Scratch', 'Roblox Studio', 'Логика'],
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Code,
    title: 'Python для детей',
    age: '10-13 лет',
    level: 'Начинающий',
    description: 'Изучение основ Python через создание интересных проектов и мини-игр',
    skills: ['Python', 'Алгоритмы', 'Pygame'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Веб-разработка',
    age: '11-14 лет',
    level: 'Средний',
    description: 'Создание собственных сайтов и веб-приложений с нуля',
    skills: ['HTML', 'CSS', 'JavaScript'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Palette,
    title: 'Геймдизайн',
    age: '12-15 лет',
    level: 'Средний',
    description: 'Разработка полноценных игр с использованием Unity и C#',
    skills: ['Unity', 'C#', '3D-моделирование'],
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Smartphone,
    title: 'Мобильные приложения',
    age: '13-16 лет',
    level: 'Продвинутый',
    description: 'Создание приложений для Android и iOS с использованием современных технологий',
    skills: ['React Native', 'Flutter', 'UI/UX'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Cpu,
    title: 'Искусственный интеллект',
    age: '14-17 лет',
    level: 'Продвинутый',
    description: 'Погружение в мир машинного обучения и нейронных сетей',
    skills: ['Python', 'TensorFlow', 'Data Science'],
    color: 'from-primary to-secondary',
  },
];

const ProgramsSection = () => {
  return (
    <section id="programs" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute left-0 top-1/3 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-foreground">Наши </span>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              программы
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Курсы для всех возрастов и уровней подготовки. От первых шагов 
            в программировании до создания сложных проектов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <Card 
              key={program.title}
              variant="cosmic"
              className="group hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <program.icon className="w-7 h-7 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {program.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{program.title}</CardTitle>
                <div className="text-sm text-accent font-medium">{program.age}</div>
                <CardDescription className="mt-2">
                  {program.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {program.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  Подробнее
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
