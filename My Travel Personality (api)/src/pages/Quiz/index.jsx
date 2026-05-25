import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import useTravelStore from '../../store/useTravelStore';
import { quizQuestions } from '../../services/api/mockData';
import { generatePersonality } from '../../utils/personalityEngine';
import AnimatedButton from '../../components/ui/AnimatedButton';

const cardVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.9, transition: { duration: 0.4 } }),
};

export default function Quiz() {
  const navigate = useNavigate();
  const { currentQuestion, answers, setAnswer, nextQuestion, prevQuestion, completeQuiz, setPersonality, setDreamCountry } = useTravelStore();

  const question = quizQuestions[currentQuestion];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentAnswer = answers[question?.id];
  const direction = 1;

  const handleSelect = useCallback((value) => {
    setAnswer(question.id, value);
  }, [question?.id, setAnswer]);

  const handleNext = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      nextQuestion();
    } else {
      // Quiz complete — generate personality
      completeQuiz();
      const result = generatePersonality(answers);
      setPersonality(result);
      setDreamCountry(result.country);
      navigate('/results');
    }
  }, [currentQuestion, totalQuestions, nextQuestion, completeQuiz, answers, setPersonality, setDreamCountry, navigate]);

  const handlePrev = useCallback(() => {
    if (currentQuestion > 0) prevQuestion();
  }, [currentQuestion, prevQuestion]);

  if (!question) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 relative">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/40 text-xs font-medium">Question {currentQuestion + 1} of {totalQuestions}</span>
            <span className="text-white/40 text-xs font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={currentQuestion} custom={direction} variants={cardVariants} initial="enter" animate="center" exit="exit">
            {/* Question text */}
            <div className="text-center mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-3xl sm:text-4xl font-bold text-white mb-3"
              >
                {question.question}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/40 text-sm"
              >
                {question.subtitle}
              </motion.p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {question.options.map((option, i) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  onClick={() => handleSelect(option.value)}
                  className={`relative text-left p-6 rounded-2xl border transition-all duration-300 group cursor-pointer ${
                    currentAnswer === option.value
                      ? 'bg-gradient-to-br from-orange-500/20 to-pink-500/20 border-orange-500/50 shadow-lg shadow-orange-500/10'
                      : 'glass border-white/5 hover:border-white/15 hover:bg-white/5'
                  }`}
                >
                  {/* Selection indicator */}
                  <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    currentAnswer === option.value ? 'border-orange-400 bg-orange-400' : 'border-white/20'
                  }`}>
                    {currentAnswer === option.value && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="text-2xl mb-2">{option.label.split(' ')[0]}</div>
                  <h3 className="text-white font-semibold text-sm mb-1">{option.label.split(' ').slice(1).join(' ')}</h3>
                  <p className="text-white/40 text-xs">{option.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 text-white/40 hover:text-white/80 text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <AnimatedButton
            onClick={handleNext}
            disabled={!currentAnswer}
            icon={currentQuestion === totalQuestions - 1 ? <Sparkles className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          >
            {currentQuestion === totalQuestions - 1 ? 'Reveal My Soul' : 'Next'}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
