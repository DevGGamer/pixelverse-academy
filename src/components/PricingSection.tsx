import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Старт',
    price: '4 900',
    period: 'месяц',
    icon: Star,
    description: 'Идеально для знакомства с программированием',
    popular: false,
    features: [
      '4 занятия в месяц',
      'Групповые уроки (до 8 человек)',
      'Доступ к материалам курса',
      'Чат поддержки',
      'Сертификат по окончании',
    ],
  },
  {
    name: 'Прогресс',
    price: '7 900',
    period: 'месяц',
    icon: Zap,
    description: 'Для активного развития навыков',
    popular: true,
    features: [
      '8 занятий в месяц',
      'Мини-группы (до 4 человек)',
      'Полный доступ к платформе',
      'Персональная обратная связь',
      'Дополнительные мастер-классы',
      'Проектная работа',
    ],
  },
  {
    name: 'Профи',
    price: '14 900',
    period: 'месяц',
    icon: Crown,
    description: 'Максимальный результат и внимание',
    popular: false,
    features: [
      '12 занятий в месяц',
      'Индивидуальные уроки',
      'Персональный план обучения',
      'Приоритетная поддержка 24/7',
      'Все мастер-классы включены',
      'Подготовка портфолио',
      'Карьерные консультации',
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute left-1/4 top-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute right-1/4 bottom-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-foreground">Выберите свой </span>
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              тариф
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Прозрачные цены без скрытых платежей. Выберите план, 
            который подходит именно вам
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              variant={plan.popular ? 'glow' : 'cosmic'}
              className={`relative transition-all duration-300 hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-primary scale-105 md:scale-110' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-1">
                  Популярный
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4 pt-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${
                  plan.popular ? 'from-primary to-secondary' : 'from-muted to-card'
                } flex items-center justify-center`}>
                  <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-primary-foreground' : 'text-accent'}`} />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">₽/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-4">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.popular ? 'cosmic' : 'outline'}
                  className="w-full"
                  size="lg"
                  onClick={() => document.querySelector('#enrollment')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Выбрать тариф
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
