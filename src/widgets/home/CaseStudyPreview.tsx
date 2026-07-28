import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container/Container';
import { Section } from '../../components/ui/Section/Section';
import { Reveal } from '../../components/ui/Reveal/Reveal';
import { caseStudies } from '../../data/caseStudies';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

export function CaseStudyPreview() {
  return (
    <Section
      id="case-studies"
      className="relative bg-[#030816] bg-[size:25%_100%] max-md:bg-[size:50%_100%] py-10 md:py-8 overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
        backgroundPosition: 'center',
      }}
    >
      <Container>
        <Reveal>
          <div className="mb-6">
            <div className="flex items-start gap-3">
              <span className="font-sans text-display-md max-md:text-h1 font-light text-accent-500 leading-[1.15]">+</span>
              <h2 className="font-sans text-display-md max-md:text-h1 font-medium leading-[1.15] tracking-tight text-accent-500 m-0">
                Case studies :<br />
                <span className="text-white">at the heart of our missions</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-6 mt-8">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 0.08}>
              <Link to={`/case-studies/${cs.slug}`} className="block h-full group">
                <div className="flex flex-col h-full bg-transparent rounded-[28px] overflow-hidden transition-all duration-fast ease-out-expo group-hover:-translate-y-2 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                  <div className="bg-white p-6 pt-10 pb-12 relative flex-grow flex flex-col rounded-t-[28px]">
                    <span className="font-sans text-[11px] uppercase tracking-[0.08em] font-bold text-accent-500 mb-5 block">
                      {cs.industry}
                    </span>
                    <h3 className="font-sans text-[1.45rem] font-medium leading-[1.35] text-[#0d121f] m-0 mb-6 tracking-tight flex-grow">
                      {cs.title}
                    </h3>
                    <div className="absolute bottom-7 right-7 w-[38px] h-[38px] rounded-full bg-accent-500 flex items-center justify-center text-white transition-all duration-fast ease-out-expo group-hover:scale-115 group-hover:rotate-90 group-hover:bg-accent-600 group-hover:shadow-[0_0_16px_rgba(47,111,237,0.45)]">
                      <FiPlus className="w-[18px] h-[18px] stroke-[3]" />
                    </div>
                  </div>
                  <div className="h-[200px] overflow-hidden rounded-b-[28px] bg-[#080c16]">
                    <img
                      src={cs.image}
                      alt={cs.title}
                      className="w-full h-full object-cover transition-transform duration-fast ease-out-expo group-hover:scale-105"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.24}>
          <div className="mt-8 flex justify-start">
            <Link to="/case-studies" className="inline-flex items-center gap-4 text-white cursor-pointer group/btn">
              <div className="w-[46px] h-[46px] rounded-full bg-accent-500 flex items-center justify-center text-white transition-all duration-fast ease-out-expo group-hover/btn:translate-x-1.5 group-hover/btn:scale-105 group-hover/btn:shadow-[0_0_16px_rgba(47,111,237,0.5)]">
                <FiArrowRight className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-mono text-[12px] font-semibold tracking-[0.08em] uppercase">VOIR TOUT</span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
