import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  ShieldAlert, 
  Award, 
  Download, 
  Send, 
  Sparkles, 
  Flame, 
  Target, 
  Activity, 
  User, 
  Phone, 
  Mail, 
  RefreshCw,
  Gift,
  CheckCircle2,
  Lock,
  ArrowRight,
  Star,
  Clock,
  CheckSquare,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

// --- E-BOOKS BÔNUS DEFINITION COM VALORAÇÃO MONETÁRIA ANCORADA ---
const BONUS_CATALOG = {
  BONUS_1: {
    id: 'b1',
    titulo: 'Guia Express de Aquecimento & Mobilidade',
    tagline: 'Prevenção de Lesões & Ativação Sinovial em 5 Min',
    badge: 'TODOS OS PLANOS',
    valorReal: 'R$ 47,00',
    icon: Zap,
    cor: '#CCFF00'
  },
  BONUS_2: {
    id: 'b2',
    titulo: 'Manual Prático de Substituição de Exercícios',
    tagline: 'Como adaptar o treino instantaneamente em academias lotadas',
    badge: 'SEMESTRAL E ANUAL',
    valorReal: 'R$ 67,00',
    icon: RefreshCw,
    cor: '#FF5500'
  },
  BONUS_3: {
    id: 'b3',
    titulo: 'Calculadora Interativa & Guia de Macronutrientes',
    tagline: 'Ajuste de Proteínas, Carbos e Calorias para o seu Objetivo',
    badge: 'EXCLUSIVO ANUAL VIP',
    valorReal: 'R$ 97,00',
    icon: Target,
    cor: '#38BDF8'
  },
  BONUS_4: {
    id: 'b4',
    titulo: 'Checklist Diário de Sono e Recuperação Muscular',
    tagline: 'Protocolo de Otimização Hormonal (GH e Testosterona)',
    badge: 'EXCLUSIVO ANUAL VIP',
    valorReal: 'R$ 49,00',
    icon: Flame,
    cor: '#A855F7'
  }
};

// --- PROVA SOCIAL / DEPOIMENTOS REALISTAS ---
const TESTIMONIALS = [
  {
    id: 1,
    nome: 'Rodrigo Mendonça',
    idade: '34 anos',
    cidade: 'São Paulo - SP',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    tempo: 'Aluno há 5 meses (Plano Semestral)',
    resultado: '-8kg de Gordura e +3cm de Braço',
    depoimento: 'Eu ficava perdido na academia sem saber o que fazer depois do aquecimento. O treino que a engine gerou com as ilustrações no WhatsApp mudou tudo. Não perco mais tempo e sinto a musculatura trabalhando de verdade!',
    estrelas: 5
  },
  {
    id: 2,
    nome: 'Camila Alencar',
    idade: '29 anos',
    cidade: 'Curitiba - PR',
    foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    tempo: 'Aluna há 8 meses (Plano Anual)',
    resultado: 'Glúteos firmes e fim das dores no joelho',
    depoimento: 'Marquei na anamnese que tinha dor no joelho e o sistema substituiu o agachamento por Leg Press articulado. Nunca mais senti pontadas e meus treinos de membros inferiores renderam o dobro.',
    estrelas: 5
  },
  {
    id: 3,
    nome: 'Lucas Silveira',
    idade: '41 anos',
    cidade: 'Belo Horizonte - MG',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    tempo: 'Aluno há 3 meses (Plano Mensal)',
    resultado: 'Rotina de 4 dias perfeitamente encaixada',
    depoimento: 'Trabalho 10 horas por dia e achava que 4 dias não eram suficientes. A divisão Upper/Lower deu o estímulo certo e economiza meu tempo. É como ter um Personal Trainer de R$ 500/mês por centavos.',
    estrelas: 5
  }
];

const EXERCISE_DATABASE = {
  // PEITO
  supino_reto_halter: {
    id: 'ex_1',
    nome: 'Supino Reto com Halteres',
    grupo: 'Peitoral Módulo Principal',
    svgType: 'chest_press',
    dica: 'Mantenha as escápulas aduzidas ("firme as costas no banco") e desça os halteres em curva controlada até a linha do peito.',
    substitutos: {
      REST_3: 'Supino Articulado com Pegada Neutra (Protege Ombros)'
    }
  },
  supino_inclinado_halter: {
    id: 'ex_2',
    nome: 'Supino Inclinado com Halteres (30°)',
    grupo: 'Peitoral Superior',
    svgType: 'incline_press',
    dica: 'Ajuste o banco em 30°. Foque na contração do peitoral superior no topo do movimento sem trancar os cotovelos.',
    substitutos: {
      REST_3: 'Crucifixo Inclinado no Crossover com Carga Leve'
    }
  },

  // COSTAS
  puxada_alta: {
    id: 'ex_4',
    nome: 'Puxada Alta com Pegada Aberta',
    grupo: 'Dorsal & Latíssimo',
    svgType: 'lat_pulldown',
    dica: 'Puxe a barra em direção à parte superior do peito, estufando o tórax. Evite balançar o tronco.',
    substitutos: {}
  },
  remada_curvada: {
    id: 'ex_5',
    nome: 'Remada Curvada Pronada com Barra',
    grupo: 'Espessura de Costas / Trapézio',
    svgType: 'row',
    dica: 'Destrave os joelhos e incline o tronco a 45°. Puxe a barra em direção ao umbigo espremendo as escápulas.',
    substitutos: {
      REST_2: 'Remada Articulada Máquina com Apoio no Peito (Protege Lombar)'
    }
  },
  remada_baixa_triangulo: {
    id: 'ex_6',
    nome: 'Remada Baixa no Cabo com Triângulo',
    grupo: 'Miolo das Costas & Latíssimo',
    svgType: 'cable_row',
    dica: 'Mantenha os ombros abaixados e conduza a puxada com os cotovelos raspando ao lado do tronco.',
    substitutos: {}
  },

  // OMBROS
  desenvolvimento_halter: {
    id: 'ex_7',
    nome: 'Desenvolvimento de Ombros com Halteres',
    grupo: 'Deltoide Anterior e Lateral',
    svgType: 'shoulder_press',
    dica: 'Não deixe os cotovelos abrirem a 90°. Mantenha-os levemente apontados à frente no plano da escápula.',
    substitutos: {
      REST_3: 'Elevação Frontal com Pegada Neutra'
    }
  },
  elevacao_lateral_cabo: {
    id: 'ex_8',
    nome: 'Elevação Lateral no Cabo (Unilateral)',
    grupo: 'Deltoide Lateral (Largura)',
    svgType: 'lateral_raise',
    dica: 'Inicie a puxada por trás do corpo para maior pré-estiramento do deltoide lateral.',
    substitutos: {}
  },

  // INFERIORES
  agachamento_livre: {
    id: 'ex_9',
    nome: 'Agachamento Livre com Barra',
    grupo: 'Quadríceps & Glúteos',
    svgType: 'squat',
    dica: 'Distribua o peso em três pontos do pé (calcanhar, base do dedão e dedinho). Joelhos acompanham as pontas dos pés.',
    substitutos: {
      REST_1: 'Leg Press 45° Amplitude Controlada (Protege Joelho)',
      REST_2: 'Agachamento Hack Guiado em Máquina'
    }
  },
  leg_press_45: {
    id: 'ex_10',
    nome: 'Leg Press 45°',
    grupo: 'Quadríceps / Volume de Coxas',
    svgType: 'leg_press',
    dica: 'Apoie as costas totalmente no encosto. Nunca retire o quadril do banco na fase inferior.',
    substitutos: {}
  },
  stiff_halter: {
    id: 'ex_11',
    nome: 'Stiff com Halteres (RDL)',
    grupo: 'Isquiotibiais & Glúteos',
    svgType: 'stiff',
    dica: 'Projete o quadril para trás como se fosse fechar uma porta com o bumbum. Mantenha a coluna neutra.',
    substitutos: {
      REST_2: 'Mesa Flexora Deitada (Sem sobrecarga axial na coluna)'
    }
  },
  cadeira_extensora: {
    id: 'ex_12',
    nome: 'Cadeira Extensora',
    grupo: 'Isolador de Quadríceps',
    svgType: 'extensora',
    dica: 'Pausa de 1 segundo na extensão máxima antes de retornar de forma controlada.',
    substitutos: {}
  },
  mesa_flexora: {
    id: 'ex_13',
    nome: 'Mesa Flexora',
    grupo: 'Isolador de Posterior de Coxa',
    svgType: 'flexora',
    dica: 'Pressione o quadril contra o banco durante todo o movimento para não compensar na lombar.',
    substitutos: {}
  },
  gemeos_sentado: {
    id: 'ex_14',
    nome: 'Gêmeos Sentado (Panturrilhas)',
    grupo: 'Sóleo e Gastrocratério',
    svgType: 'calf',
    dica: 'Amplitude máxima: desça até sentir esticar completamente e suba na ponta dos pés.',
    substitutos: {}
  },

  // BRAÇOS & ABDÔMEN
  rosca_direta_halter: {
    id: 'ex_15',
    nome: 'Rosca Alternada com Halteres no Banco 45°',
    grupo: 'Bíceps (Cabeça Longa)',
    svgType: 'biceps',
    dica: 'Mantenha os cotovelos alinhados ao tronco sem projetá-los para a frente durante a subida.',
    substitutos: {}
  },
  triceps_corda: {
    id: 'ex_16',
    nome: 'Tríceps Pulley com Corda',
    grupo: 'Tríceps (Lateral e Medial)',
    svgType: 'triceps',
    dica: 'Afaste as pontas da corda no final do movimento para contração máxima da cabeça lateral.',
    substitutos: {}
  },
  abdominal_infra: {
    id: 'ex_17',
    nome: 'Abdominal Infra no Solo com Elevação de Quadril',
    grupo: 'Abdômen Core',
    svgType: 'abs',
    dica: 'Eleve o quadril 2cm do solo no topo comprimindo o abdômen sem dar impulsos com as pernas.',
    substitutos: {}
  }
};

// Renderizador dos Diagramas de Exercícios em SVG Neon
const ExerciseSvgVisualizer = ({ type }) => {
  return (
    <div className="w-full h-36 bg-[#121218] rounded-lg border border-[#27273A] flex items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#CCFF00_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <svg className="w-28 h-28 text-[#CCFF00] drop-shadow-[0_0_12px_rgba(204,255,0,0.3)] transition-transform duration-300 group-hover:scale-105" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {type === 'chest_press' && (
          <g>
            <line x1="20" y1="65" x2="80" y2="65" stroke="#4A4A68" strokeWidth="4" />
            <line x1="30" y1="65" x2="30" y2="80" stroke="#4A4A68" strokeWidth="3" />
            <line x1="70" y1="65" x2="70" y2="80" stroke="#4A4A68" strokeWidth="3" />
            <circle cx="28" cy="58" r="6" stroke="#FFFFFF" fill="#181820" />
            <path d="M34 60 L65 60" stroke="#FFFFFF" strokeWidth="5" />
            <path d="M48 60 L48 40 L55 35" stroke="#CCFF00" strokeWidth="3.5" />
            <circle cx="55" cy="35" r="4" fill="#FF5500" stroke="#FF5500" />
            <circle cx="45" cy="35" r="4" fill="#FF5500" stroke="#FF5500" />
            <path d="M50 48 L50 32" stroke="#CCFF00" strokeDasharray="2,2" strokeWidth="2" />
            <path d="M47 35 L50 30 L53 35" stroke="#CCFF00" fill="none" strokeWidth="2" />
          </g>
        )}

        {type === 'squat' && (
          <g>
            <line x1="15" y1="85" x2="85" y2="85" stroke="#4A4A68" strokeWidth="3" />
            <circle cx="50" cy="28" r="6" stroke="#FFFFFF" fill="#181820" />
            <path d="M50 34 L45 55 L62 68 L58 85" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="30" y1="36" x2="70" y2="36" stroke="#FF5500" strokeWidth="4" />
            <rect x="25" y="31" width="6" height="10" fill="#CCFF00" rx="1" />
            <rect x="69" y="31" width="6" height="10" fill="#CCFF00" rx="1" />
            <path d="M50 15 L50 24" stroke="#CCFF00" strokeWidth="2" strokeDasharray="2,2" />
            <path d="M47 21 L50 26 L53 21" stroke="#CCFF00" fill="none" strokeWidth="2" />
          </g>
        )}

        {type === 'lat_pulldown' && (
          <g>
            <path d="M20 85 L20 20 L80 20" stroke="#4A4A68" strokeWidth="3" />
            <line x1="80" y1="20" x2="80" y2="40" stroke="#CCFF00" strokeWidth="2" />
            <line x1="65" y1="40" x2="95" y2="40" stroke="#FF5500" strokeWidth="4" />
            <circle cx="80" cy="50" r="6" stroke="#FFFFFF" fill="#181820" />
            <path d="M80 56 L80 75 M80 65 L70 85" stroke="#FFFFFF" strokeWidth="4" />
            <path d="M80 58 L68 42 M80 58 L92 42" stroke="#CCFF00" strokeWidth="3" />
          </g>
        )}

        {type !== 'chest_press' && type !== 'squat' && type !== 'lat_pulldown' && (
          <g>
            <circle cx="50" cy="35" r="8" stroke="#FFFFFF" strokeWidth="3" />
            <path d="M50 43 L50 70 M50 55 L32 40 M50 55 L68 40 M50 70 L38 90 M50 70 L62 90" stroke="#FFFFFF" strokeWidth="3.5" />
            <circle cx="30" cy="38" r="5" fill="#CCFF00" />
            <circle cx="70" cy="38" r="5" fill="#CCFF00" />
            <path d="M25 38 L75 38" stroke="#FF5500" strokeWidth="2" strokeDasharray="3,3" />
          </g>
        )}
      </svg>

      <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-[#181820]/90 px-2 py-0.5 rounded border border-[#27273A] text-[10px] text-[#CCFF00] font-mono">
        <Sparkles className="w-3 h-3 text-[#CCFF00]" /> ILUSTRAÇÃO 3D VETORIAL
      </div>
    </div>
  );
};

export default function App() {
  const [currentStep, setCurrentStep] = useState('PLANS'); // PLANS, WIZARD, RESULT
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('semestral');

  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [formData, setFormData] = useState({
    nome: 'Gabriel Oliveira',
    email: 'gabriel.aluno@email.com',
    whatsapp: '(11) 98765-4321',
    objetivo: 'hipertrofia',
    experiencia: 'intermediario',
    frequencia: '4dias',
    restricao: 'REST_0'
  });

  const [generatedWorkout, setGeneratedWorkout] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState('');

  const handleSelectPlan = (planKey) => {
    setSelectedPlan(planKey);
    setCurrentStep('WIZARD');
    setWizardStep(1);
  };

  const generateWorkoutEngine = () => {
    setIsGenerating(true);

    setTimeout(() => {
      let treinos = [];
      let divisaoNome = '';
      const exp = formData.experiencia;
      const rest = formData.restricao;

      if (formData.frequencia === '3dias') {
        divisaoNome = 'ABC (3x por Semana - Foco Frequência Equilibrada)';
        treinos = [
          {
            letra: 'A',
            titulo: 'PEITO, OMBROS E TRÍCEPS',
            exercicios: [
              { base: EXERCISE_DATABASE.supino_reto_halter, series: '3', reps: '10-12', descanso: '90s', cadencia: '3-0-1-0' },
              { base: EXERCISE_DATABASE.supino_inclinado_halter, series: '3', reps: '10-12', descanso: '90s', cadencia: '2-0-1-0' },
              { base: EXERCISE_DATABASE.desenvolvimento_halter, series: '3', reps: '10-12', descanso: '90s', cadencia: '2-0-1-0' },
              { base: EXERCISE_DATABASE.elevacao_lateral_cabo, series: '4', reps: '12-15', descanso: '60s', cadencia: '2-1-1-0' },
              { base: EXERCISE_DATABASE.triceps_corda, series: '3', reps: '12-15', descanso: '60s', cadencia: '2-0-1-1' }
            ]
          },
          {
            letra: 'B',
            titulo: 'COSTAS, BÍCEPS E ABDÔMEN',
            exercicios: [
              { base: EXERCISE_DATABASE.puxada_alta, series: '3', reps: '10-12', descanso: '90s', cadencia: '3-0-1-0' },
              { base: EXERCISE_DATABASE.remada_curvada, series: '3', reps: '10-12', descanso: '90s', cadencia: '2-1-1-0' },
              { base: EXERCISE_DATABASE.remada_baixa_triangulo, series: '3', reps: '10-12', descanso: '90s', cadencia: '2-0-1-0' },
              { base: EXERCISE_DATABASE.rosca_direta_halter, series: '3', reps: '12-15', descanso: '60s', cadencia: '2-0-1-0' },
              { base: EXERCISE_DATABASE.abdominal_infra, series: '3', reps: '15-20', descanso: '60s', cadencia: '2-0-1-1' }
            ]
          },
          {
            letra: 'C',
            titulo: 'MEMBROS INFERIORES E PANTURRILHAS',
            exercicios: [
              { base: EXERCISE_DATABASE.agachamento_livre, series: '3', reps: '10-12', descanso: '90s', cadencia: '3-0-1-0' },
              { base: EXERCISE_DATABASE.leg_press_45, series: '3', reps: '12-15', descanso: '90s', cadencia: '2-0-1-0' },
              { base: EXERCISE_DATABASE.stiff_halter, series: '3', reps: '10-12', descanso: '90s', cadencia: '3-0-1-0' },
              { base: EXERCISE_DATABASE.cadeira_extensora, series: '3', reps: '12-15', descanso: '60s', cadencia: '2-0-1-1' },
              { base: EXERCISE_DATABASE.gemeos_sentado, series: '4', reps: '15-20', descanso: '60s', cadencia: '2-1-1-1' }
            ]
          }
        ];
      } else if (formData.frequencia === '4dias') {
        divisaoNome = 'UPPER / LOWER (4x por Semana - Volume e Recuperação Ideal)';
        treinos = [
          {
            letra: 'A',
            titulo: 'TREINO A: SUPERIOR (UPPER A)',
            exercicios: [
              { base: EXERCISE_DATABASE.supino_reto_halter, series: exp === 'avancado' ? '4' : '3', reps: '8-10', descanso: '120s', cadencia: '3-0-1-0' },
              { base: EXERCISE_DATABASE.remada_curvada, series: '4', reps: '8-10', descanso: '120s', cadencia: '2-1-1-0' },
              { base: EXERCISE_DATABASE.supino_inclinado_halter, series: '3', reps: '10-12', descanso: '90s', cadencia: '2-0-1-0' },
              { base: EXERCISE_DATABASE.puxada_alta, series: '3', reps: '10-12', descanso: '90s', cadencia: '2-0-1-0' },
              { base: EXERCISE_DATABASE.elevacao_lateral_cabo, series: '4', reps: '12-15', descanso: '60s', cadencia: '2-1-1-0' }
            ]
          },
          {
            letra: 'B',
            titulo: 'TREINO B: INFERIOR (LOWER A)',
            exercicios: [
              { base: EXERCISE_DATABASE.agachamento_livre, series: '4', reps: '8-10', descanso: '120s', cadencia: '3-0-1-0' },
              { base: EXERCISE_DATABASE.stiff_halter, series: '4', reps: '8-10', descanso: '120s', cadencia: '3-0-1-0' },
              { base: EXERCISE_DATABASE.leg_press_45, series: '3', reps: '10-12', descanso: '90s', cadencia: '2-0-1-0' },
              { base: EXERCISE_DATABASE.mesa_flexora, series: '3', reps: '10-12', descanso: '90s', cadencia: '2-0-1-1' },
              { base: EXERCISE_DATABASE.gemeos_sentado, series: '4', reps: '12-15', descanso: '60s', cadencia: '2-1-1-1' }
            ]
          }
        ];
      } else {
        divisaoNome = 'PUSH / PULL / LEGS / UPPER (5x ou 6x por Semana - Alta Intensidade)';
        treinos = [
          {
            letra: 'A',
            titulo: 'PUSH A (PEITO, OMBROS & TRÍCEPS)',
            exercicios: [
              { base: EXERCISE_DATABASE.supino_inclinado_halter, series: '4', reps: '6-8', descanso: '120s', cadencia: '3-0-1-0' },
              { base: EXERCISE_DATABASE.supino_reto_halter, series: '3', reps: '10-12', descanso: '90s', cadencia: '2-0-1-0' },
              { base: EXERCISE_DATABASE.desenvolvimento_halter, series: '4', reps: '8-10', descanso: '90s', cadencia: '2-0-1-0' },
              { base: EXERCISE_DATABASE.elevacao_lateral_cabo, series: '4', reps: '12-15', descanso: '60s', cadencia: '2-1-1-0' },
              { base: EXERCISE_DATABASE.triceps_corda, series: '4', reps: '10-12', descanso: '60s', cadencia: '2-0-1-1' }
            ]
          },
          {
            letra: 'B',
            titulo: 'PULL A (COSTAS, DELTOIDE POSTERIOR & BÍCEPS)',
            exercicios: [
              { base: EXERCISE_DATABASE.puxada_alta, series: '4', reps: '6-8', descanso: '120s', cadencia: '3-0-1-0' },
              { base: EXERCISE_DATABASE.remada_curvada, series: '4', reps: '8-10', descanso: '90s', cadencia: '2-1-1-0' },
              { base: EXERCISE_DATABASE.remada_baixa_triangulo, series: '3', reps: '12-15', descanso: '60s', cadencia: '2-0-1-0' },
              { base: EXERCISE_DATABASE.rosca_direta_halter, series: '4', reps: '10-12', descanso: '60s', cadencia: '2-0-1-0' }
            ]
          }
        ];
      }

      const treinosFormatados = treinos.map((treino) => ({
        ...treino,
        exercicios: treino.exercicios.map((ex) => {
          let nomeFinal = ex.base.nome;
          let foiModificado = false;
          let motivoSubstituicao = '';

          if (rest !== 'REST_0' && ex.base.substitutos && ex.base.substitutos[rest]) {
            nomeFinal = ex.base.substitutos[rest];
            foiModificado = true;
            motivoSubstituicao = rest === 'REST_1' ? 'Proteção articular para Joelho' : rest === 'REST_2' ? 'Alívio de sobrecarga na Lombar' : 'Redução de impacto no Ombro';
          }

          return {
            ...ex,
            nomeFinal,
            foiModificado,
            motivoSubstituicao
          };
        })
      }));

      const objTag = formData.objetivo.substring(0, 3).toUpperCase();
      const expTag = formData.experiencia.substring(0, 3).toUpperCase();
      const freqTag = formData.frequencia.toUpperCase();
      const generatedCode = `#MF-${objTag}-${expTag}-${freqTag}-${formData.restricao}`;

      let bonusIncluidos = [BONUS_CATALOG.BONUS_1];
      if (selectedPlan === 'semestral' || selectedPlan === 'anual') {
        bonusIncluidos.push(BONUS_CATALOG.BONUS_2);
      }
      if (selectedPlan === 'anual') {
        bonusIncluidos.push(BONUS_CATALOG.BONUS_3);
        bonusIncluidos.push(BONUS_CATALOG.BONUS_4);
      }

      setGeneratedWorkout({
        codigo: generatedCode,
        divisaoNome,
        treinos: treinosFormatados,
        bonusIncluidos,
        dataGeracao: new Date().toLocaleDateString('pt-BR')
      });

      setIsGenerating(false);
      setCurrentStep('RESULT');
    }, 1200);
  };

  const handleSimularEnvio = (canal) => {
    setNotification(`Ficha enviada com sucesso via ${canal} para ${formData.whatsapp}!`);
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0F0F14] text-white font-sans antialiased selection:bg-[#CCFF00] selection:text-black">
      
      {/* BANNER SUPERIOR DE URGÊNCIA */}
      <div className="bg-gradient-to-r from-[#FF5500] via-[#E04B00] to-[#FF5500] text-white py-2 px-4 text-center text-xs font-bold font-mono tracking-wide flex items-center justify-center gap-2 shadow-md">
        <Flame className="w-4 h-4 fill-white animate-pulse" />
        <span>LOTE PROMOCIONAL COM DESCONTO DE ATÉ 60%</span>
        <span className="hidden sm:inline">| Apenas 7 vagas com montagem automática de treino hoje</span>
        <div className="bg-black/40 px-2 py-0.5 rounded text-[#CCFF00] font-mono flex items-center gap-1 ml-2">
          <Clock className="w-3 h-3" />
          <span>{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
      </div>

      {/* HEADER PRINCIPAL */}
      <header className="border-b border-[#27273A] bg-[#14141D]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentStep('PLANS')}>
            <div className="w-11 h-11 bg-gradient-to-br from-[#CCFF00] to-[#FF5500] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.3)]">
              <Dumbbell className="w-6 h-6 text-black transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black tracking-tighter text-2xl bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent italic">
                  METRA<span className="text-[#CCFF00]">FORCE</span>
                </span>
                <span className="text-[10px] bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/30 font-mono px-1.5 py-0.5 rounded uppercase font-bold">
                  SaaS V2.4
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium hidden sm:block">Prescrição Inteligente de Treinos Automatizada</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <button 
              onClick={() => setCurrentStep('PLANS')}
              className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${currentStep === 'PLANS' ? 'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00]/40 shadow-[0_0_15px_rgba(204,255,0,0.2)]' : 'bg-[#181820] text-gray-400 border-[#27273A] hover:border-gray-500'}`}
            >
              <span className="w-5 h-5 rounded-full bg-current flex items-center justify-center text-[10px] text-black font-bold">1</span>
              <span className="hidden md:inline">1. Planos & Oferta</span>
            </button>

            <div className="w-4 h-0.5 bg-[#27273A]" />

            <button 
              onClick={() => {
                if (currentStep !== 'PLANS') setCurrentStep('WIZARD');
              }}
              className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${currentStep === 'WIZARD' ? 'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00]/40 shadow-[0_0_15px_rgba(204,255,0,0.2)]' : 'bg-[#181820] text-gray-400 border-[#27273A]'}`}
            >
              <span className="w-5 h-5 rounded-full bg-current flex items-center justify-center text-[10px] text-black font-bold">2</span>
              <span className="hidden md:inline">2. Anamnese Inteligente</span>
            </button>

            <div className="w-4 h-0.5 bg-[#27273A]" />

            <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border ${currentStep === 'RESULT' ? 'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00]/40 shadow-[0_0_15px_rgba(204,255,0,0.2)]' : 'bg-[#181820] text-gray-400 border-[#27273A]'}`}>
              <span className="w-5 h-5 rounded-full bg-current flex items-center justify-center text-[10px] text-black font-bold">3</span>
              <span className="hidden md:inline">3. Ficha Gerada</span>
            </div>
          </div>

        </div>
      </header>

      {/* TOAST NOTIFICAÇÃO */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#CCFF00] text-black px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(204,255,0,0.5)] font-bold flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-black" />
          <span>{notification}</span>
        </div>
      )}

      {/* CONTEÚDO DINÂMICO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* -------------------------------------------------------------------------------- */}
        {/* TELA 1: SELEÇÃO DE PLANOS COM COPYWRITING                                        */}
        {/* -------------------------------------------------------------------------------- */}
        {currentStep === 'PLANS' && (
          <div className="space-y-16 animate-fadeIn">
            
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181820] border border-[#CCFF00]/30 text-xs font-mono text-[#CCFF00]">
                <Sparkles className="w-4 h-4 text-[#CCFF00]" /> CHEGA DE FICHA GENÉRICA E RESULTADOS ESTAGANADOS
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase italic leading-none">
                Sua Ficha de Treino Personalizada por <span className="bg-gradient-to-r from-[#CCFF00] via-white to-[#FF5500] bg-clip-text text-transparent">Menos de R$ 0,66 por dia</span>
              </h1>

              <p className="text-gray-300 text-base sm:text-xl max-w-3xl mx-auto font-normal">
                Receba uma periodização profissional no seu WhatsApp com base na sua anamnese, seu nível e restrições articulares. <strong className="text-white">A mesma eficiência de um Personal de R$ 600/mês, por um valor menor que um cafezinho diário!</strong>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-4">
                <div className="bg-[#181820]/80 p-5 rounded-2xl border border-red-500/20 space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>COMO A MAIORIA TREINA (E FRUSTRA):</span>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-2">
                    <li className="flex items-center gap-2">❌ Treinos padrão de ficha impressa genérica de academia</li>
                    <li className="flex items-center gap-2">❌ Dores no joelho e lombar por falta de adaptação</li>
                    <li className="flex items-center gap-2">❌ Sem trocas mensais de cargas (estagnação muscular)</li>
                  </ul>
                </div>

                <div className="bg-[#181820]/80 p-5 rounded-2xl border border-[#CCFF00]/30 space-y-3">
                  <div className="flex items-center gap-2 text-[#CCFF00] font-bold text-sm">
                    <CheckSquare className="w-5 h-5 shrink-0" />
                    <span>COM O SISTEMA AUTOMÁTICO METRAFORCE:</span>
                  </div>
                  <ul className="text-xs text-gray-200 space-y-2">
                    <li className="flex items-center gap-2">✅ Matriz de decisão que prescreve o treino exato para seu objetivo</li>
                    <li className="flex items-center gap-2">✅ Substituição imediata de exercícios que causam dor</li>
                    <li className="flex items-center gap-2">✅ Ficha em PDF ilustrada direto no celular + WhatsApp</li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              
              {/* PLANO MENSAL */}
              <div className="bg-[#181820] border border-[#27273A] rounded-2xl p-8 flex flex-col justify-between hover:border-[#4A4A68] transition-all relative group">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">Teste sem Fidelidade</span>
                    <h3 className="text-2xl font-black text-white mt-1">Plano Mensal</h3>
                    <p className="text-xs text-gray-400 mt-1">1 Treino sob medida renovado a cada ciclo</p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-gray-400">R$</span>
                      <span className="text-5xl font-black text-white tracking-tight">39</span>
                      <span className="text-xl font-bold text-white">,90</span>
                      <span className="text-xs text-gray-400 font-mono">/mês</span>
                    </div>
                    <div className="mt-2 inline-block bg-[#121218] px-3 py-1 rounded-full border border-[#27273A] text-[11px] font-mono text-[#CCFF00]">
                      ⚡ Apenas R$ 1,33 por dia
                    </div>
                  </div>

                  <div className="border-t border-[#27273A] pt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-[#CCFF00]" />
                      <span>Ficha Personalizada Automática</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-[#CCFF00]" />
                      <span>Envio em PDF no celular + WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-[#CCFF00]" />
                      <span>Ilustrações 3D de cada exercício</span>
                    </div>
                  </div>

                  <div className="bg-[#121218] rounded-xl p-4 border border-[#27273A] space-y-1">
                    <div className="text-[11px] font-mono font-bold text-[#CCFF00] uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><Gift className="w-3.5 h-3.5" /> BÔNUS GRÁTIS:</span>
                      <span className="line-through text-gray-500 font-normal">R$ 47,00</span>
                    </div>
                    <p className="text-xs text-white font-semibold">Guia Express de Aquecimento & Mobilidade (PDF)</p>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan('mensal')}
                  className="mt-8 w-full py-4 bg-[#27273A] hover:bg-[#34344E] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider text-xs"
                >
                  <span>Assinar Plano Mensal</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* PLANO SEMESTRAL */}
              <div className="bg-gradient-to-b from-[#1E1E2C] to-[#181820] border-2 border-[#CCFF00] rounded-2xl p-8 flex flex-col justify-between relative shadow-[0_0_50px_rgba(204,255,0,0.2)] transform md:-translate-y-2">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#CCFF00] to-[#FF5500] text-black font-black text-[11px] px-4 py-1 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-black animate-bounce" /> OPÇÃO MAIS VENDIDA DE HOJE
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest font-bold">Garantia de Constância</span>
                    <h3 className="text-2xl font-black text-white mt-1">Plano Semestral</h3>
                    <p className="text-xs text-gray-400 mt-1">6 Meses de Treino (Periodização trocada a cada 30 dias)</p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-gray-400">6x de R$</span>
                      <span className="text-5xl font-black text-[#CCFF00] tracking-tight">29</span>
                      <span className="text-xl font-bold text-[#CCFF00]">,90</span>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 bg-[#CCFF00]/10 px-3 py-1 rounded-full border border-[#CCFF00]/40 text-xs font-mono text-[#CCFF00]">
                      <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <strong>Menos de R$ 0,99 por dia!</strong>
                    </div>
                    <p className="text-xs text-gray-400 font-mono mt-1.5">ou R$ 179,40 à vista (Economia de R$ 60)</p>
                  </div>

                  <div className="border-t border-[#27273A] pt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-200">
                      <Check className="w-5 h-5 text-[#CCFF00]" />
                      <span><strong>6 Meses de Evolução Progressiva</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-200">
                      <Check className="w-5 h-5 text-[#CCFF00]" />
                      <span>Troca mensal automática de estímulos</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-200">
                      <Check className="w-5 h-5 text-[#CCFF00]" />
                      <span>Ajuste automático para dores e restrições</span>
                    </div>
                  </div>

                  <div className="bg-[#121218] rounded-xl p-4 border border-[#CCFF00]/40 space-y-2">
                    <div className="text-[11px] font-mono font-bold text-[#CCFF00] uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><Gift className="w-3.5 h-3.5" /> 2 BÔNUS INCLUSOS:</span>
                      <span className="line-through text-gray-500 font-normal">R$ 114,00</span>
                    </div>
                    <ul className="text-xs text-gray-300 space-y-1 font-medium">
                      <li className="flex items-center justify-between">
                        <span>▪ Guia de Aquecimento & Mobilidade</span>
                        <span className="text-[#CCFF00] text-[10px] font-bold">GRÁTIS</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>▪ Manual de Substituição de Exercícios</span>
                        <span className="text-[#CCFF00] text-[10px] font-bold">GRÁTIS</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan('semestral')}
                  className="mt-8 w-full py-4 bg-gradient-to-r from-[#CCFF00] to-[#B3E600] hover:brightness-110 text-black font-black rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(204,255,0,0.5)] transition-all uppercase tracking-wider text-xs"
                >
                  <span>Garantir Plano Semestral</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              {/* PLANO ANUAL VIP */}
              <div className="bg-[#181820] border border-[#27273A] rounded-2xl p-8 flex flex-col justify-between hover:border-[#FF5500]/50 transition-all relative">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-[#FF5500] uppercase tracking-widest font-bold">Transformação Completa de 1 Ano</span>
                    <h3 className="text-2xl font-black text-white mt-1">Plano Anual VIP</h3>
                    <p className="text-xs text-gray-400 mt-1">12 Meses de periodização + Pacote completo de 4 Bônus</p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-gray-400">12x de R$</span>
                      <span className="text-5xl font-black text-white tracking-tight">19</span>
                      <span className="text-xl font-bold text-white">,90</span>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 bg-[#FF5500]/10 px-3 py-1 rounded-full border border-[#FF5500]/40 text-xs font-mono text-[#FF5500]">
                      <Flame className="w-3.5 h-3.5 text-[#FF5500]" />
                      <strong>Apenas R$ 0,66 por dia (Mais barato que um café!)</strong>
                    </div>
                    <p className="text-xs text-gray-400 font-mono mt-1.5">ou R$ 238,80 à vista</p>
                  </div>

                  <div className="border-t border-[#27273A] pt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-[#FF5500]" />
                      <span><strong>12 Meses de Treino Personalizado</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-[#FF5500]" />
                      <span>Fichas atualizadas a cada 30 dias</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-[#FF5500]" />
                      <span>Prioridade no envio pelo WhatsApp</span>
                    </div>
                  </div>

                  <div className="bg-[#121218] rounded-xl p-4 border border-[#FF5500]/40 space-y-2">
                    <div className="text-[11px] font-mono font-bold text-[#FF5500] uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> 4 BÔNUS VIP LIBERADOS:</span>
                      <span className="line-through text-gray-500 font-normal">R$ 260,00</span>
                    </div>
                    <p className="text-xs text-gray-300 font-medium">
                      Receba os 4 e-books completos (incluindo a Calculadora de Macronutrientes e o Checklist de Sono).
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan('anual')}
                  className="mt-8 w-full py-4 bg-[#FF5500] hover:bg-[#E04B00] text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider text-xs shadow-[0_0_25px_rgba(255,85,0,0.3)]"
                >
                  <span>Garantir Oferta Anual</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* SEÇÃO DE DEPOIMENTOS */}
            <div className="space-y-8 pt-6 border-t border-[#27273A]">
              <div className="text-center space-y-2">
                <span className="text-xs font-mono text-[#CCFF00] font-bold uppercase tracking-widest">PROVA SOCIAL DE QUEM JÁ ESTÁ TREINANDO</span>
                <h2 className="text-3xl font-black text-white">Resultados Reais de Alunos Reais</h2>
                <p className="text-xs text-gray-400">Veja o que dizem os alunos que abandonaram as fichas genéricas de papel.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="bg-[#181820] border border-[#27273A] rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-[#CCFF00]">
                        {[...Array(t.estrelas)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#CCFF00]" />
                        ))}
                      </div>

                      <p className="text-xs text-gray-300 italic leading-relaxed">
                        "{t.depoimento}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#27273A] flex items-center gap-3">
                      <img 
                        src={t.foto} 
                        alt={t.nome} 
                        className="w-10 h-10 rounded-full object-cover border border-[#CCFF00]" 
                      />
                      <div>
                        <h4 className="font-bold text-white text-xs">{t.nome} ({t.idade})</h4>
                        <span className="text-[10px] font-mono text-[#CCFF00] block">{t.resultado}</span>
                        <span className="text-[10px] text-gray-500 block">{t.tempo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GARANTIA */}
            <div className="bg-[#181820] border border-[#27273A] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#CCFF00]/10 border border-[#CCFF00]/40 flex items-center justify-center shrink-0">
                <UserCheck className="w-8 h-8 text-[#CCFF00]" />
              </div>
              <div className="space-y-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
                  <span>Garantia de 7 Dias Incondicional de Reembolso</span>
                  <span className="text-xs font-mono text-black bg-[#CCFF00] px-2 py-0.5 rounded font-bold uppercase">Risco Zero</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Experimente o sistema por <strong>7 dias inteiros</strong>. Preencha a anamnese e receba seu treino. Se dentro desse período de 7 dias você entender que a prescrição automatizada não é para você, basta solicitar com um clique e devolveremos 100% do seu dinheiro. Sem burocracia.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------------------------- */}
        {/* TELA 2: FORMULÁRIO INTERATIVO DE ANAMNESE (WIZARD 5 PASSOS)                        */}
        {/* -------------------------------------------------------------------------------- */}
        {currentStep === 'WIZARD' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
            <div className="bg-[#181820] border border-[#27273A] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#CCFF00] font-bold uppercase tracking-widest">
                    ANAMNESE DIGITAL AUTOMÁTICA
                  </span>
                  <h2 className="text-2xl font-black text-white mt-1">Passo {wizardStep} de 5</h2>
                </div>
                <div className="bg-[#121218] px-3 py-1.5 rounded-lg border border-[#27273A] text-xs font-mono text-gray-400">
                  Plano: <span className="text-[#CCFF00] font-bold uppercase">{selectedPlan}</span>
                </div>
              </div>

              <div className="w-full bg-[#121218] h-3 rounded-full overflow-hidden p-0.5 border border-[#27273A]">
                <div 
                  className="bg-gradient-to-r from-[#CCFF00] to-[#FF5500] h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(wizardStep / 5) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-[#181820] border border-[#27273A] rounded-2xl p-6 sm:p-8 space-y-6">

              {/* PASSO 1 */}
              {wizardStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-[#CCFF00]" /> Seus Dados Pessoais de Entrega
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">É para onde enviaremos o seu treino formatado e os bônus.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-300 uppercase mb-2">Seu Nome Completo</label>
                      <div className="relative">
                        <User className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                        <input
                          type="text"
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          className="w-full bg-[#121218] border border-[#27273A] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#CCFF00] text-sm"
                          placeholder="Digite seu nome"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-300 uppercase mb-2">E-mail para Recebimento</label>
                      <div className="relative">
                        <Mail className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#121218] border border-[#27273A] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#CCFF00] text-sm"
                          placeholder="seu.email@exemplo.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-300 uppercase mb-2">WhatsApp com DDD</label>
                      <div className="relative">
                        <Phone className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
                        <input
                          type="text"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="w-full bg-[#121218] border border-[#27273A] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#CCFF00] text-sm"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PASSO 2 */}
              {wizardStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-[#CCFF00]" /> Qual é o seu Objetivo Principal?
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">O sistema ajustará as faixas de repetição e descansos com base nisso.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'hipertrofia', label: 'Hipertrofia Muscular', desc: 'Ganho de massa magra e volume', icon: Dumbbell },
                      { id: 'emagrecimento', label: 'Emagrecimento & Definição', desc: 'Queima de gordura e densidade', icon: Flame },
                      { id: 'saude', label: 'Condicionamento Geral', desc: 'Resistência física e vitalidade', icon: Activity }
                    ].map((item) => {
                      const Icon = item.icon;
                      const active = formData.objetivo === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, objetivo: item.id })}
                          className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                            active ? 'bg-[#CCFF00]/10 border-[#CCFF00] text-white shadow-[0_0_20px_rgba(204,255,0,0.15)]' : 'bg-[#121218] border-[#27273A] text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          <Icon className={`w-8 h-8 mb-3 ${active ? 'text-[#CCFF00]' : 'text-gray-500'}`} />
                          <div>
                            <div className="font-bold text-white text-sm">{item.label}</div>
                            <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASSO 3 */}
              {wizardStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#CCFF00]" /> Há quanto tempo você treina musculação?
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Determinará a seleção de técnicas avançadas e número total de séries.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 'iniciante', title: 'Iniciante (Menos de 6 meses de treino)', desc: 'Treinos focados no aprendizado de execução, volume moderado e alta segurança.' },
                      { id: 'intermediario', title: 'Intermediário (De 6 meses a 2 anos)', desc: 'Foco em progressão contínua de carga e inclusão de variações de exercícios.' },
                      { id: 'avancado', title: 'Avançado (Mais de 2 anos de constância)', desc: 'Alto volume, uso de rest-pause, drop-sets e periodização de intensidade.' }
                    ].map((item) => {
                      const active = formData.experiencia === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, experiencia: item.id })}
                          className={`p-5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            active ? 'bg-[#CCFF00]/10 border-[#CCFF00] text-white' : 'bg-[#121218] border-[#27273A] text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-white text-sm">{item.title}</div>
                            <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
                          </div>
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${active ? 'border-[#CCFF00] bg-[#CCFF00] text-black' : 'border-gray-600'}`}>
                            {active && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASSO 4 */}
              {wizardStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-[#CCFF00]" /> Quantos dias por semana você vai à academia?
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Definirá a divisão de agrupamentos musculares (ABC, Upper/Lower, PPL).</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: '3dias', tag: '3 DIAS', title: 'Divisão ABC', desc: 'Ideal para quem busca máxima eficiência em poucos dias.' },
                      { id: '4dias', tag: '4 DIAS', title: 'Divisão Upper / Lower', desc: 'Divisão altamente recomendada para hipertrofia e descanso de articulações.' },
                      { id: '5dias', tag: '5 DIAS', title: 'Divisão Push / Pull / Legs', desc: 'Para quem busca alto volume e foco em pontos fracos.' },
                      { id: '6dias', tag: '6 DIAS', title: 'Divisão PPL 2x', desc: 'Volume máximo semanal para praticantes avançados.' }
                    ].map((item) => {
                      const active = formData.frequencia === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, frequencia: item.id })}
                          className={`p-5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                            active ? 'bg-[#CCFF00]/10 border-[#CCFF00]' : 'bg-[#121218] border-[#27273A] text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded w-max mb-3 ${active ? 'bg-[#CCFF00] text-black' : 'bg-[#27273A] text-gray-300'}`}>
                            {item.tag}
                          </span>
                          <div>
                            <div className="font-bold text-white text-sm">{item.title}</div>
                            <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASSO 5 */}
              {wizardStep === 5 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-[#FF5500]" /> Possui alguma limitação articular ou dor?
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">O motor de código substituirá automaticamente os exercícios de risco pelos equivalentes seguros.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'REST_0', title: 'Nenhuma Limitação', desc: 'Sem dores articulares. Todos os exercícios liberados.' },
                      { id: 'REST_1', title: 'Dores no Joelho', desc: 'Substitui Agachamento Livre e passadas por variações guiadas de menor compressão.' },
                      { id: 'REST_2', title: 'Dores na Lombar', desc: 'Substitui Stiff/Remadas livres por apoios no banco e máquinas.' },
                      { id: 'REST_3', title: 'Dores nos Ombros', desc: 'Ajusta angulação de supinos e elevações para o plano escapular seguro.' }
                    ].map((item) => {
                      const active = formData.restricao === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, restricao: item.id })}
                          className={`p-5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                            active ? 'bg-[#FF5500]/10 border-[#FF5500] text-white' : 'bg-[#121218] border-[#27273A] text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-white text-sm flex items-center justify-between">
                              <span>{item.title}</span>
                              {active && <Check className="w-4 h-4 text-[#FF5500]" />}
                            </div>
                            <div className="text-xs text-gray-400 mt-2">{item.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-[#121218] rounded-xl p-4 border border-[#27273A] flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      Tudo pronto para compilar a ficha de <strong className="text-white">{formData.nome}</strong>
                    </div>
                    <span className="text-xs font-mono text-[#CCFF00] font-bold">ALGORITMO PRONTO</span>
                  </div>
                </div>
              )}

              {/* BOTÕES DE NAVEGAÇÃO DO WIZARD */}
              <div className="flex items-center justify-between border-t border-[#27273A] pt-6">
                {wizardStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep(wizardStep - 1)}
                    className="px-5 py-3 rounded-xl border border-[#27273A] text-gray-300 hover:bg-[#27273A] text-xs font-bold flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCurrentStep('PLANS')}
                    className="px-5 py-3 rounded-xl border border-[#27273A] text-gray-400 hover:bg-[#27273A] text-xs font-bold"
                  >
                    Trocar Plano
                  </button>
                )}

                {wizardStep < 5 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep(wizardStep + 1)}
                    className="px-6 py-3 rounded-xl bg-[#CCFF00] hover:bg-[#B3E600] text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                  >
                    <span>Próximo Passo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={generateWorkoutEngine}
                    disabled={isGenerating}
                    className="px-8 py-4 bg-gradient-to-r from-[#CCFF00] to-[#FF5500] text-black font-black text-sm uppercase tracking-wider rounded-xl flex items-center gap-3 shadow-[0_0_25px_rgba(204,255,0,0.4)] hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Compilando Treino em PDF...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 fill-black" />
                        <span>Gerar Ficha Personalizada Agora</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>

          </div>
        )}

        {/* -------------------------------------------------------------------------------- */}
        {/* TELA 3: EXIBIÇÃO DA FICHA GERADA                                                 */}
        {/* -------------------------------------------------------------------------------- */}
        {currentStep === 'RESULT' && generatedWorkout && (
          <div className="space-y-10 animate-fadeIn">
            
            <div className="bg-[#181820] border border-[#27273A] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] text-xs font-mono font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4" /> FICHA PROCESSADA E COMPILADA COM SUCESSO
                </div>
                <h2 className="text-3xl font-black text-white">
                  Treino de {formData.nome}
                </h2>
                <p className="text-xs font-mono text-gray-400 mt-1">
                  ID do Registro: <span className="text-[#CCFF00] font-bold">{generatedWorkout.codigo}</span> | Data: {generatedWorkout.dataGeracao}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => handleSimularEnvio('WhatsApp')}
                  className="flex-1 md:flex-initial px-5 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  <Send className="w-4 h-4 fill-black" />
                  <span>Enviar no WhatsApp</span>
                </button>

                <button
                  onClick={() => handleSimularEnvio('E-mail')}
                  className="flex-1 md:flex-initial px-5 py-3.5 bg-[#27273A] hover:bg-[#34344E] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider border border-[#4A4A68]"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar PDF Oficial</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* ESQUERDA: SIMULADOR MOBILE */}
              <div className="lg:col-span-8 space-y-6">
                
                <div className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center justify-between">
                  <span>PREVIEW EM TEMPO REAL DO LAYOUT DO CELULAR DO ALUNO</span>
                  <span className="text-[#CCFF00]">MODO PDF VETORIAL</span>
                </div>

                <div className="bg-[#121218] border-2 border-[#27273A] rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
                  
                  <div className="border-b border-[#27273A] pb-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#CCFF00] rounded-lg flex items-center justify-center font-black text-black">
                          M
                        </div>
                        <span className="font-black text-xl tracking-tight text-white italic">
                          METRA<span className="text-[#CCFF00]">FORCE</span>
                        </span>
                      </div>
                      <span className="bg-[#27273A] text-gray-300 text-[10px] font-mono px-2.5 py-1 rounded uppercase font-bold">
                        PLANO: {selectedPlan}
                      </span>
                    </div>

                    <div className="bg-[#181820] rounded-xl p-4 border border-[#27273A] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-mono block">Aluno</span>
                        <span className="font-bold text-white truncate block">{formData.nome}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-mono block">Objetivo</span>
                        <span className="font-bold text-[#CCFF00] uppercase block">{formData.objetivo}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-mono block">Nível</span>
                        <span className="font-bold text-white uppercase block">{formData.experiencia}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-mono block">Restrição</span>
                        <span className="font-bold text-[#FF5500] uppercase block">
                          {formData.restricao === 'REST_0' ? 'Nenhuma' : formData.restricao}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-gray-400">
                      DIVISÃO PRESCITA: <strong className="text-white">{generatedWorkout.divisaoNome}</strong>
                    </div>
                  </div>

                  <div className="pt-6 space-y-10">
                    {generatedWorkout.treinos.map((treinoItem, idx) => (
                      <div key={idx} className="space-y-6">
                        
                        <div className="bg-gradient-to-r from-[#27273A] to-[#181820] px-4 py-3 rounded-xl border-l-4 border-[#CCFF00] flex items-center justify-between">
                          <span className="font-black text-white text-base tracking-wide uppercase">
                            {treinoItem.titulo}
                          </span>
                          <span className="text-xs font-mono text-[#CCFF00] bg-black/40 px-2 py-0.5 rounded">
                            {treinoItem.exercicios.length} EXERCÍCIOS
                          </span>
                        </div>

                        <div className="space-y-6">
                          {treinoItem.exercicios.map((ex, exIdx) => (
                            <div key={exIdx} className="bg-[#181820] border border-[#27273A] rounded-2xl p-5 space-y-4 hover:border-[#4A4A68] transition-all">
                              
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <span className="w-7 h-7 rounded-lg bg-[#121218] border border-[#27273A] text-[#CCFF00] font-mono text-xs font-bold flex items-center justify-center">
                                    0{exIdx + 1}
                                  </span>
                                  <div>
                                    <h4 className="font-bold text-white text-base leading-tight">
                                      {ex.nomeFinal}
                                    </h4>
                                    <span className="text-[11px] text-gray-400 font-mono">
                                      {ex.base.grupo}
                                    </span>
                                  </div>
                                </div>

                                {ex.foiModificado && (
                                  <span className="text-[10px] font-mono bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/40 px-2 py-1 rounded font-bold">
                                    SUBSTITUÍDO (SEGURANÇA)
                                  </span>
                                )}
                              </div>

                              <ExerciseSvgVisualizer type={ex.base.svgType} />

                              <div className="grid grid-cols-4 gap-2 text-center">
                                <div className="bg-[#121218] p-2.5 rounded-xl border border-[#27273A]">
                                  <span className="text-[9px] font-mono text-gray-400 uppercase block">Séries</span>
                                  <span className="text-base font-black text-[#CCFF00]">{ex.series}</span>
                                </div>
                                <div className="bg-[#121218] p-2.5 rounded-xl border border-[#27273A]">
                                  <span className="text-[9px] font-mono text-gray-400 uppercase block">Reps</span>
                                  <span className="text-base font-black text-white">{ex.reps}</span>
                                </div>
                                <div className="bg-[#121218] p-2.5 rounded-xl border border-[#27273A]">
                                  <span className="text-[9px] font-mono text-gray-400 uppercase block">Descanso</span>
                                  <span className="text-base font-black text-white">{ex.descanso}</span>
                                </div>
                                <div className="bg-[#121218] p-2.5 rounded-xl border border-[#27273A]">
                                  <span className="text-[9px] font-mono text-gray-400 uppercase block">Cadência</span>
                                  <span className="text-xs font-bold text-[#FF5500] mt-1 block">{ex.cadencia}</span>
                                </div>
                              </div>

                              <div className="bg-[#121218] p-3 rounded-xl border border-[#27273A] text-xs text-gray-300 flex items-start gap-2.5">
                                <Zap className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-white">Dica de Execução:</strong> {ex.base.dica}
                                </div>
                              </div>

                              {ex.foiModificado && (
                                <div className="bg-[#FF5500]/10 p-2.5 rounded-xl border border-[#FF5500]/30 text-[11px] text-[#FF5500] flex items-center gap-2 font-mono">
                                  <ShieldAlert className="w-4 h-4 shrink-0" />
                                  <span>{ex.motivoSubstituicao}</span>
                                </div>
                              )}

                            </div>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-[#27273A] pt-4 text-center text-[10px] font-mono text-gray-500">
                    Sua Marca Fitness © 2026. Prescrição Gerada via MetraForce Engine.
                  </div>

                </div>

              </div>

              {/* DIREITA: BÔNUS LIBERADOS */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className="bg-[#181820] border border-[#27273A] rounded-2xl p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-[#27273A] pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Gift className="w-5 h-5 text-[#CCFF00]" /> Bônus Liberados
                      </h3>
                      <p className="text-xs text-gray-400">Materiais inclusos gratuitamente no seu plano</p>
                    </div>
                    <span className="text-xs font-mono text-[#CCFF00] font-bold bg-[#CCFF00]/10 px-2 py-1 rounded">
                      {generatedWorkout.bonusIncluidos.length} / 4 E-BOOKS
                    </span>
                  </div>

                  <div className="space-y-4">
                    {generatedWorkout.bonusIncluidos.map((bonus) => {
                      const Icon = bonus.icon;
                      return (
                        <div key={bonus.id} className="bg-[#121218] p-4 rounded-xl border border-[#27273A] flex items-start gap-3 relative overflow-hidden group">
                          <div className="p-2.5 rounded-lg bg-[#181820] border border-[#27273A] shrink-0">
                            <Icon className="w-5 h-5" style={{ color: bonus.cor }} />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#27273A] text-white">
                                {bonus.badge}
                              </span>
                              <span className="text-[11px] font-mono text-gray-400 line-through">
                                {bonus.valorReal}
                              </span>
                            </div>
                            <h5 className="font-bold text-white text-xs leading-snug">
                              {bonus.titulo}
                            </h5>
                            <p className="text-[11px] text-gray-400">
                              {bonus.tagline}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {selectedPlan !== 'anual' && (
                    <div className="bg-[#121218] p-4 rounded-xl border border-dashed border-[#FF5500]/40 text-center space-y-2">
                      <Lock className="w-5 h-5 text-[#FF5500] mx-auto" />
                      <p className="text-xs text-gray-300">
                        Faça upgrade para o <strong className="text-[#FF5500]">Plano Anual VIP</strong> para desbloquear os bônus de Macronutrientes e Sono (R$ 146 em valor extra)!
                      </p>
                      <button 
                        onClick={() => setCurrentStep('PLANS')}
                        className="text-xs font-bold text-[#CCFF00] hover:underline block mx-auto"
                      >
                        Fazer Upgrade do Plano →
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-[#181820] border border-[#27273A] rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-[#CCFF00]" /> Próxima Troca de Treino
                  </h3>
                  <p className="text-xs text-gray-400">
                    Conforme a regra do plano <strong className="text-white uppercase">{selectedPlan}</strong>, o seu próximo microciclo será liberado em 30 dias automaticamente.
                  </p>
                  
                  <div className="bg-[#121218] p-4 rounded-xl border border-[#27273A] space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Fase Atual:</span>
                      <span className="text-[#CCFF00] font-bold font-mono">MÊS 01 (ADAPTAÇÃO & FORÇA)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Próxima Fase:</span>
                      <span className="text-white font-bold font-mono">MÊS 02 (VOLUME HIPERTRÓFICO)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep('WIZARD')}
                    className="w-full py-3 bg-[#27273A] hover:bg-[#34344E] text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Refazer Anamnese / Testar Outro Perfil
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}