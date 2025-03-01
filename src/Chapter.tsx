
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ContentReader from '@/components/ContentReader';
import { ChevronLeft } from 'lucide-react';
import { useAssistant } from '@/context/AssistantContext';

// Comprehensive chapter content for all subjects
const chapters: Record<string, {
  title: string;
  subject: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
}> = {
  // Physics chapters
  "physics/chapter-1": {
    title: "Introduction to Mechanics",
    subject: "physics",
    sections: [
      {
        title: "Newton's Laws of Motion",
        content: `
          Newton's laws of motion are three fundamental physical laws that form the foundation for classical mechanics. These laws describe the relationship between the motion of an object and the forces acting on it.
          
          The First Law, also known as the law of inertia, states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This concept challenges the intuitive Aristotelian view that objects naturally come to rest.
          
          The Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This is often written as F = ma, where F is the net force, m is the mass, and a is the acceleration.
          
          The Third Law states that for every action, there is an equal and opposite reaction. This means that when one object exerts a force on another, the second object exerts an equal and opposite force on the first.
        `
      },
      {
        title: "Conservation of Energy",
        content: `
          The law of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another. The total energy of an isolated system remains constant over time.
          
          In mechanics, we often deal with two main types of energy: kinetic energy, which is the energy of motion, and potential energy, which is stored energy due to position or configuration. The sum of kinetic and potential energy is called mechanical energy.
          
          For example, as a ball falls, its potential energy decreases while its kinetic energy increases, but the total mechanical energy remains the same, assuming no energy is lost to friction or air resistance.
          
          This principle is crucial in understanding and solving many physics problems, as it provides a powerful constraint on possible outcomes of physical processes.
        `
      },
      {
        title: "Momentum",
        content: `
          Momentum is a vector quantity defined as the product of an object's mass and velocity. It is an important concept in mechanics because the total momentum of a closed system is conserved, meaning it doesn't change over time.
          
          The conservation of momentum is particularly useful in analyzing collisions. In an isolated system, the total momentum before a collision equals the total momentum after the collision, regardless of whether the collision is elastic or inelastic.
          
          Impulse, which is the integral of force over time, equals the change in momentum. This relationship, known as the impulse-momentum theorem, is useful in situations where force varies over time, such as during impacts.
          
          Understanding momentum and its conservation helps explain a wide range of phenomena, from rocket propulsion to billiard ball collisions.
        `
      }
    ]
  },
  "physics/chapter-2": {
    title: "Thermodynamics",
    subject: "physics",
    sections: [
      {
        title: "Laws of Thermodynamics",
        content: `
          The laws of thermodynamics define fundamental physical quantities and explain how they relate to one another, particularly in the context of energy transfers.
          
          The Zeroth Law of Thermodynamics states that if two systems are in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This establishes temperature as a fundamental parameter.
          
          The First Law of Thermodynamics is essentially a restatement of the conservation of energy principle. It states that energy cannot be created or destroyed in an isolated system. Mathematically, the change in internal energy equals heat added minus work done by the system.
          
          The Second Law of Thermodynamics introduces the concept of entropy and states that the total entropy of an isolated system always increases over time. This explains why certain processes are irreversible.
          
          The Third Law of Thermodynamics states that as a system approaches absolute zero temperature, all processes cease and the entropy approaches a minimum value.
        `
      },
      {
        title: "Heat Transfer",
        content: `
          Heat transfer is the movement of thermal energy from one object or system to another. There are three main mechanisms of heat transfer: conduction, convection, and radiation.
          
          Conduction is the transfer of heat through direct contact between particles of matter. It occurs primarily in solids and is facilitated by the transfer of vibrational energy between adjacent atoms or molecules.
          
          Convection involves the movement of heat through the bulk motion of fluids (liquids or gases). Natural convection occurs due to density differences caused by temperature variations, while forced convection requires external forces like fans or pumps.
          
          Radiation is the transfer of heat through electromagnetic waves, requiring no medium for propagation. All objects emit thermal radiation based on their temperature, with hotter objects emitting more radiation per unit area than cooler ones.
          
          Understanding these mechanisms is crucial for applications ranging from building insulation to cooling systems in electronics.
        `
      }
    ]
  },
  // Chemistry chapters
  "chemistry/chapter-1": {
    title: "Atomic Structure",
    subject: "chemistry",
    sections: [
      {
        title: "The Atomic Model",
        content: `
          The modern atomic model has evolved through centuries of scientific discovery. The journey began with Dalton's atomic theory, which proposed that all matter consists of indivisible particles called atoms.
          
          J.J. Thomson's discovery of electrons led to the "plum pudding" model, where electrons were embedded in a positive mass. This was later challenged by Rutherford's gold foil experiment, which revealed that atoms have a dense, positively-charged nucleus with electrons orbiting around it.
          
          Niels Bohr refined this model by proposing that electrons orbit the nucleus in specific energy levels or shells. This explained the emission spectra of hydrogen and introduced quantum concepts to atomic structure.
          
          The modern quantum mechanical model, developed by Schrödinger and others, describes electrons not as discrete particles with defined orbits, but as probability distributions around the nucleus, called orbitals. These orbitals have specific shapes and energies, determined by quantum numbers.
        `
      },
      {
        title: "Periodic Table and Trends",
        content: `
          The periodic table arranges elements based on their atomic number and electron configuration, revealing periodic trends in properties. Its current form is attributed to Mendeleev and Moseley.
          
          Key periodic trends include atomic radius, which generally decreases across a period and increases down a group due to nuclear charge and shielding effects. Ionization energy, the energy required to remove an electron, generally increases across a period and decreases down a group.
          
          Electronegativity, a measure of an atom's ability to attract electrons in a bond, generally increases across periods and decreases down groups. This trend is crucial for predicting bond types and molecular properties.
          
          Understanding these trends helps chemists predict how elements will interact and form compounds, making the periodic table one of chemistry's most powerful tools.
        `
      }
    ]
  },
  // Mathematics chapters
  "math/chapter-1": {
    title: "Calculus Fundamentals",
    subject: "math",
    sections: [
      {
        title: "Limits and Continuity",
        content: `
          Limits form the foundational concept of calculus, describing the value a function approaches as its input approaches a particular value. Formally, we say the limit of f(x) as x approaches c is L, written as lim(x→c) f(x) = L, if f(x) can be made arbitrarily close to L by taking x sufficiently close to c.
          
          Continuity builds upon limits, stating that a function is continuous at a point if the limit at that point equals the function's value. More precisely, a function f is continuous at a point c if: (1) f(c) is defined, (2) lim(x→c) f(x) exists, and (3) lim(x→c) f(x) = f(c).
          
          Limits can be evaluated using various techniques, including direct substitution, factoring, rationalization, and the squeeze theorem. Understanding when these techniques apply is crucial for solving limit problems efficiently.
          
          The concept of continuity has profound implications, including the Intermediate Value Theorem, which guarantees that a continuous function takes on all values between any two of its function values.
        `
      },
      {
        title: "Derivatives and Applications",
        content: `
          Derivatives measure the rate of change of a function with respect to its variable. Geometrically, the derivative represents the slope of the tangent line to a function at a point.
          
          The formal definition of a derivative is given by lim(h→0) [f(x+h) - f(x)]/h, denoted as f'(x) or df/dx. This limit definition leads to various differentiation rules, including the power rule, product rule, quotient rule, and chain rule.
          
          Derivatives have numerous applications. In physics, they represent velocity and acceleration. In economics, they help determine marginal cost and revenue. In optimization problems, critical points are found by setting the derivative equal to zero.
          
          Higher-order derivatives represent successive rates of change. The second derivative, f''(x), helps determine the concavity of a function and is used in Taylor series expansions, which approximate functions using polynomial expressions.
        `
      }
    ]
  },
  // Computer Science chapters
  "computer-science/chapter-1": {
    title: "Algorithms and Data Structures",
    subject: "computer-science",
    sections: [
      {
        title: "Algorithm Analysis",
        content: `
          Algorithm analysis is the process of determining the computational complexity of algorithms – the amount of resources (time and space) required to execute them. This analysis is crucial for selecting the most efficient algorithm for a specific problem.
          
          Big O notation is the primary tool for expressing algorithmic efficiency, describing the upper bound of an algorithm's growth rate. Common complexities include O(1) for constant time operations, O(log n) for logarithmic algorithms like binary search, O(n) for linear algorithms, O(n log n) for efficient sorting algorithms, and O(n²) for quadratic algorithms.
          
          Time complexity measures the number of operations an algorithm performs, while space complexity measures the amount of memory it uses. These complexities are typically analyzed in terms of the worst-case scenario, though average-case analysis can also provide valuable insights.
          
          Understanding algorithmic complexity allows developers to predict performance bottlenecks and make informed decisions about algorithm selection based on input size and available resources.
        `
      },
      {
        title: "Fundamental Data Structures",
        content: `
          Arrays are the simplest data structure, storing elements in contiguous memory locations. They offer O(1) access time but have fixed size and expensive insertion/deletion operations in the middle.
          
          Linked lists overcome these limitations by storing elements in nodes with pointers to the next (and sometimes previous) node. They allow for efficient insertions and deletions but sacrifice random access efficiency.
          
          Stacks follow the Last-In-First-Out (LIFO) principle, supporting push and pop operations. They are essential for function calls, expression evaluation, and backtracking algorithms.
          
          Queues operate on the First-In-First-Out (FIFO) principle, with enqueue and dequeue operations. They're used in breadth-first search, scheduling, and system message handling.
          
          Trees, particularly binary trees, provide hierarchical storage with logarithmic access, insertion, and deletion times when balanced. They form the basis for more complex structures like binary search trees, heaps, and B-trees.
          
          Graphs represent networks of connected entities and are implemented using adjacency matrices or adjacency lists. They're essential for solving connectivity, shortest path, and network flow problems.
        `
      }
    ]
  },
  // Biology chapters
  "biology/chapter-1": {
    title: "Cell Biology",
    subject: "biology",
    sections: [
      {
        title: "Cell Structure and Function",
        content: `
          Cells are the fundamental units of life, with two main types: prokaryotic cells (bacteria and archaea) lack a nucleus and most organelles, while eukaryotic cells (plants, animals, fungi, and protists) have a defined nucleus and specialized organelles.
          
          The plasma membrane forms the cell boundary, consisting of a phospholipid bilayer with embedded proteins. It regulates what enters and exits the cell through processes like diffusion, osmosis, facilitated diffusion, and active transport.
          
          Within eukaryotic cells, the nucleus houses DNA and controls cellular activities. The endoplasmic reticulum (rough and smooth) synthesizes proteins and lipids, while the Golgi apparatus modifies, sorts, and packages macromolecules for secretion or use within the cell.
          
          Mitochondria are the powerhouses of the cell, generating ATP through cellular respiration. Chloroplasts, found in plant cells, capture light energy for photosynthesis. Lysosomes contain digestive enzymes for breaking down cellular waste and foreign materials.
          
          The cytoskeleton, composed of microfilaments, intermediate filaments, and microtubules, provides structural support, enables cell movement, and facilitates internal transportation.
        `
      },
      {
        title: "Cell Division and Reproduction",
        content: `
          Cell division is essential for growth, repair, and reproduction in all organisms. The cell cycle consists of interphase (G1, S, and G2 phases) followed by cell division through mitosis or meiosis.
          
          During interphase, the cell grows (G1), replicates its DNA (S), and prepares for division (G2). Checkpoints throughout the cycle ensure that conditions are favorable for progression.
          
          Mitosis divides a single cell into two genetically identical daughter cells through prophase, metaphase, anaphase, and telophase, followed by cytokinesis. This process is crucial for asexual reproduction, growth, and tissue repair in multicellular organisms.
          
          Meiosis, occurring only in germ cells, involves two sequential divisions resulting in four haploid cells, each with half the original number of chromosomes. This reduction division is essential for sexual reproduction, generating genetic diversity through crossing over and independent assortment.
          
          Errors in cell division can lead to chromosomal abnormalities, which may cause developmental disorders, cancer, or other diseases. Regulation of the cell cycle is therefore tightly controlled by cyclins, cyclin-dependent kinases, and tumor suppressor genes.
        `
      }
    ]
  }
};

const Chapter = () => {
  const { chapterId, subject } = useParams<{ chapterId: string; subject: string }>();
  const { speak } = useAssistant();
  
  // Construct the chapter key using subject and chapterId
  const chapterKey = subject && chapterId ? `${subject}/${chapterId}` : null;
  const chapter = chapterKey ? chapters[chapterKey] : null;
  
  // Auto-read title and first section on mount
  useEffect(() => {
    if (chapter) {
      // Small delay to ensure components are mounted
      const timeoutId = setTimeout(() => {
        const titleText = `${chapter.title}. This chapter contains the following sections: `;
        const sectionsList = chapter.sections.map(section => section.title).join(", ");
        speak(`${titleText} ${sectionsList}`);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [chapter, speak]);

  if (!chapter) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Chapter not found</h1>
          <p className="mb-6">The chapter you're looking for doesn't exist or hasn't been created yet.</p>
          <Link to={`/${subject || 'physics'}`} className="text-primary hover:underline flex items-center justify-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to {subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : 'Physics'}
          </Link>
        </div>
      </Layout>
    );
  }

  const subjectTitle = chapter.subject.charAt(0).toUpperCase() + chapter.subject.slice(1);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <ContentReader autoRead={true} title={chapter.title} />
        
        <Link to={`/${chapter.subject}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4 transition-all-200">
          <ChevronLeft className="h-4 w-4" />
          Back to {subjectTitle}
        </Link>
        
        <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full mb-2">
          {chapterId?.replace('-', ' ').charAt(0).toUpperCase() + chapterId?.replace('-', ' ').slice(1)}
        </span>
        <h1 className="text-3xl font-bold tracking-tight mb-6 content-readable">
          {chapter.title}
        </h1>
        
        <div className="space-y-12 mb-8">
          {chapter.sections.map((section, index) => (
            <section key={index} className="glass rounded-lg p-6 shadow-soft">
              <h2 className="text-xl font-bold mb-4 content-readable">{section.title}</h2>
              {section.content.split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-4 text-muted-foreground content-readable">
                  {paragraph.trim()}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Chapter;
