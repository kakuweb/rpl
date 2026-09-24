import type {
  NewsItem,
  Paper,
  Person,
  ResearchLine,
  Video,
} from "@/lib/types";

/**
 * Copia offline dei contenuti di supabase/seed.sql.
 *
 * Serve a una cosa sola: far girare il sito quando il database non è
 * raggiungibile o non è ancora stato popolato, invece di mostrare pagine
 * vuote o schermate di errore. Una volta che Supabase è la fonte dei dati
 * questo file resta indietro, ed è previsto che sia così — i contenuti veri
 * si modificano dal Table Editor di Supabase, non qui.
 */

export const people: Person[] = [
  {
    id: "vito-cacucciolo",
    slug: "vito-cacucciolo",
    name: "Vito Cacucciolo",
    role: "Principal Investigator",
    role_group: "pi",
    bio: "Professor at Politecnico di Bari (DMMM). ERC Starting Grant holder with the RoboFluid project. Co-inventor of stretchable pumps (Nature, 2019) and fiber pumps (Science, 2023). Founder of the spin-off OmniGrasp.",
    photo_url: "/people/vito-cacucciolo.jpg",
    photo_label: "Portrait photo",
    profile_url: "https://www.linkedin.com/in/vito-cacucciolo/",
    sort_order: 10,
    published: true,
  },
  {
    id: "yu-kuwajima",
    slug: "yu-kuwajima",
    name: "Yu Kuwajima",
    role: "Assistant Professor / RTDA",
    role_group: "researchers",
    bio: "Soft pumps and electrofluidics. Co-author of the stretchable pumps (Nature, 2019); now working on electro-active fluids for wearable robotics within the RoboFluid project.",
    photo_url: "/people/yu-kuwajima.jpg",
    photo_label: "Portrait photo",
    profile_url: "https://www.linkedin.com/in/kuwajima-yu-313662308/",
    sort_order: 20,
    published: true,
  },
  {
    id: "angelo-catalano",
    slug: "angelo-catalano",
    name: "Angelo Catalano",
    role: "PhD Student",
    role_group: "phd",
    bio: "PhD candidate on robots-as-a-service for digital industry. Technical team leader in the winning entry at the RoboSoft Competition 2026 in Kanazawa.",
    photo_url: "/people/angelo-catalano.jpg",
    photo_label: "Portrait photo",
    profile_url: "https://www.linkedin.com/in/-angelo-catalano/",
    sort_order: 55,
    published: true,
  },
  {
    id: "simone-de-carolis",
    slug: "simone-de-carolis",
    name: "Simone De Carolis",
    role: "Assistant Professor / RTDA",
    role_group: "researchers",
    bio: "",
    photo_url: "/people/simone-de-carolis.jpg",
    photo_label: "Portrait photo",
    profile_url:
      "https://www.linkedin.com/in/simone-de-carolis-3b9a3011b/",
    sort_order: 45,
    published: true,
  },
  {
    id: "andrea-castellaneta",
    slug: "andrea-castellaneta",
    name: "Andrea Castellaneta",
    role: "PhD Student",
    role_group: "phd",
    bio: "Soft and wearable robotics powered by electro-active fluids, within the ERC RoboFluid project and the national PhD programme in Autonomous Systems (DAuSy).",
    photo_url: "/people/andrea-castellaneta.jpg",
    photo_label: "Portrait photo",
    profile_url: "https://www.linkedin.com/in/andreacastellaneta1/",
    sort_order: 60,
    published: true,
  },
  {
    id: "cesare-cariddi",
    slug: "cesare-cariddi",
    name: "Cesare Cariddi",
    role: "PhD Student",
    role_group: "phd",
    bio: "Within the ERC RoboFluid project and the national PhD programme in Autonomous Systems (D-RIM).",
    photo_url: "/people/cesare-cariddi.jpg",
    photo_label: "Portrait photo",
    profile_url: "https://www.linkedin.com/in/cesare-cariddi-7982a92bb/",
    sort_order: 70,
    published: true,
  },
  {
    id: "angelica-de-michele",
    slug: "angelica-de-michele",
    name: "Angelica De Michele",
    role: "MSc Student",
    role_group: "students",
    bio: "Master of Science in Mechatronics and Robotics Engineering Student | Bachelor’s Degree in Mechanical Engineering",
    photo_url: "/people/angelica-de-michele.jpg",
    photo_label: "Portrait photo",
    profile_url: "https://www.linkedin.com/in/angelica-de-michele-5713052b5/",
    sort_order: 75,
    published: true,
  },
  {
    id: "nicola-creanza",
    slug: "nicola-creanza",
    name: "Nicola Creanza",
    role: "MSc Student / Lab Manager",
    role_group: "students",
    bio: "Master of Science in Mechatronics and Robotics Engineering Student | Bachelor’s Degree in Mechanical Engineering",
    photo_url: "/people/nicola-creanza.jpg",
    photo_label: "Portrait photo",
    profile_url: "https://www.linkedin.com/in/nicola-creanza-9509b7255/",
    sort_order: 78,
    published: true,
  },
  {
    id: "elisabetta-annese",
    slug: "elisabetta-annese",
    name: "Elisabetta Annese",
    role: "MSc Student",
    role_group: "students",
    bio: "Member of the winning team at the RoboSoft Competition 2026 (Kanazawa, Japan). Thesis on soft manipulation.",
    photo_url: null,
    photo_label: "Portrait photo",
    profile_url: null,
    sort_order: 80,
    published: true,
  },
  {
    id: "luca-mitaritonna",
    slug: "luca-mitaritonna",
    name: "Luca Mitaritonna",
    role: "MSc Student",
    role_group: "students",
    bio: "Member of the winning team at the RoboSoft Competition 2026 (Kanazawa, Japan). Thesis on electroadhesive grippers.",
    photo_url: null,
    photo_label: "Portrait photo",
    profile_url: null,
    sort_order: 90,
    published: true,
  },
  {
    id: "giuseppe-macchia",
    slug: "giuseppe-macchia",
    name: "Giuseppe Macchia",
    role: "MSc Student",
    role_group: "students",
    bio: "Member of the winning team at the RoboSoft Competition 2026 (Kanazawa, Japan). Thesis on fluidic-actuator control.",
    photo_url: null,
    photo_label: "Portrait photo",
    profile_url: null,
    sort_order: 100,
    published: true,
  },
  {
    id: "wahei-kamimura",
    slug: "wahei-kamimura",
    name: "Wahei Kamimura",
    // TODO: periodo del soggiorno nel laboratorio, da aggiungere alla bio.
    role: "Visiting Researcher",
    role_group: "visitors",
    bio: "Flexible and stretchable electronics: printed circuits and deformable sensors for bioelectronics and soft robotics. Researcher in the Fukuda Research Group at Osaka University.",
    photo_url: null,
    photo_label: "Portrait photo",
    profile_url: null,
    sort_order: 110,
    published: true,
  },
  {
    id: "paolo-di-molfetta",
    slug: "paolo-di-molfetta",
    name: "Paolo Di Molfetta",
    // TODO: ruolo e anni nel laboratorio, e dove si trova ora. Il profilo
    // LinkedIn non è leggibile senza account, quindi i dati vanno chiesti.
    role: "Alumnus",
    role_group: "alumni",
    bio: "",
    photo_url: "/people/paolo-di-molfetta.jpg",
    photo_label: "Portrait photo",
    profile_url: "https://www.linkedin.com/in/paolo-di-molfetta-51b25323a/",
    sort_order: 130,
    published: true,
  },
];

export const papers: Paper[] = [
  {
    id: "electrofluidic-fiber-muscles",
    slug: "electrofluidic-fiber-muscles",
    title: "Electrofluidic fiber muscles",
    journal: "Science Robotics",
    year: 2026,
    authors_short: "Kilic Afsar, Pupillo, Vitucci, Babatain, Ishii, Cacucciolo.",
    authors_full:
      "O. Kilic Afsar, G. Pupillo, G. Vitucci, W. Babatain, H. Ishii, V. Cacucciolo",
    citation:
      "Science Robotics (2026) — MIT Media Lab · Politecnico di Bari · Co-funded by the European Research Council",
    summary:
      "With the MIT Media Lab: a new class of fiber-format artificial muscles that integrates fiber pumps and McKibben actuators in a closed circuit. Electric, silent and untethered, they pair up in antagonistic configurations like biological muscle and, thanks to bias pressure, reach power densities comparable to skeletal muscle.",
    abstract:
      "A new class of fiber-format artificial muscles integrating charge-injection fiber pumps and McKibben actuators in a closed circuit — electric, silent and untethered, with a power density comparable to skeletal muscle.",
    external_url: "https://www.science.org/doi/10.1126/scirobotics.ady6438",
    external_label: "Paper on Science Robotics",
    extra_url: "https://www.media.mit.edu/projects/electrofluidicmuscle/overview/",
    extra_label: "Project at the MIT Media Lab",
    media_label: "Image — electrofluidic fiber muscle",
    media_url: "/papers/woven-muscle-pair.png",
    media_width: 1400,
    media_height: 356,
    facts: [
      { value: "~1 mm", label: "muscle-fiber scale, weavable into textiles" },
      { value: "900 kPa/m", label: "pressure generated by the integrated fiber pumps" },
      { value: "<200 ms", label: "response time with pumps in parallel" },
      { value: "≈ muscle", label: "power density comparable to skeletal muscle" },
    ],
    sections: [
      { type: "heading", text: "The problem" },
      {
        type: "paragraph",
        text: "Muscles are extraordinarily effective systems for generating controlled force, and engineering has struggled for decades to match their combination of power, speed, scalability and control. Fluidic actuators come close, but depend on heavy, noisy external hydraulic infrastructure. And the electric motors of today's robots produce rotation on a shaft — a configuration fundamentally different from the linear contraction of natural muscle.",
      },
      { type: "heading", text: "The innovation" },
      {
        type: "paragraph",
        text: "The electrofluidic fiber muscles (EFM) close the loop on the two earlier research lines: the charge-injection fiber pumps are integrated directly into the muscle system, in a closed fluidic circuit with thin McKibben actuators. A millimetre-scale pump sits between two actuators, pushing fluid into one to contract it while the other relaxes. The result is an electric, silent and untethered muscle: no external pumps, compressors or tubes.",
      },
      {
        type: "media",
        label: "Video still — antagonistic pair in motion",
        caption:
          "Fig. 1 — Antagonistic configuration: one fiber contracts while the other extends, like the biceps and triceps in the arm.",
        url: "/untethered-woven.webp",
        width: 760,
        height: 428,
      },
      { type: "heading", text: "Like real muscle" },
      {
        type: "paragraph",
        text: "Like the fibers that bundle together in biological muscle, the EFMs combine in different configurations depending on the task. A key finding is the role of bias pressure: by pre-pressurising the circuit, the modular muscles reach a power density comparable to that of skeletal muscle. Each fiber weighs a few grams and is not much thicker than a toothpick; woven together, they form flat muscle pairs that can be integrated into textiles.",
      },
      {
        type: "media",
        label: "Image — woven textile muscle pair",
        caption:
          "Fig. 2 — Textile muscle pairs: McKibben actuators and fiber pumps braided into a single active fabric.",
        url: "/papers/woven-muscle-pair.png",
        width: 1400,
        height: 356,
      },
      {
        type: "video",
        youtube_id: "_tOTOjzNouU",
        label: "Video — electrofluidic fiber muscles",
        caption:
          "The muscles in motion: contraction, extension and the antagonistic pairs described above.",
      },
      { type: "heading", text: "The applications" },
      {
        type: "paragraph",
        text: "The fiber format is particularly suited to wearable applications: exosuits that assist load lifting, devices that restore or augment the dexterity of the hand, prosthetics with the linear configuration of natural muscle. But the principles extend to fluidic robotic systems in general — from soft manipulation to robots that collaborate safely with people.",
      },
    ],
    sort_order: 10,
    published: true,
  },
  {
    id: "fiber-pumps-wearable-fluidic-systems",
    slug: "fiber-pumps-wearable-fluidic-systems",
    title: "Fiber pumps for wearable fluidic systems",
    journal: "Science",
    year: 2023,
    authors_short: "Smith, Cacucciolo, Shea.",
    authors_full: "M. Smith, V. Cacucciolo, H. Shea",
    citation: "Science 379, 1327–1332 (2023) — EPFL",
    summary:
      "The pump becomes a fiber: a soft tube 2 mm in diameter with helical electrodes embedded in the wall, produced continuously and weavable like a thread. It integrates pressurised fluidic circuits directly into garments and textiles, for thermoregulation, muscle support and haptic feedback.",
    abstract:
      "A soft 2 mm tube with helical electrodes embedded in the wall, produced continuously and weavable like a thread — bringing pressurised fluidic circuits directly into garments for thermoregulation, muscle support and haptic feedback.",
    external_url: "https://www.science.org/doi/10.1126/science.ade8654",
    external_label: "Paper on Science",
    extra_url: null,
    extra_label: null,
    media_label: "Image — fiber pump in textile",
    media_url: "/papers/fiber-pump.jpg",
    media_width: 1920,
    media_height: 1080,
    facts: [
      { value: "2 mm", label: "in diameter: a pump in the form of a thread" },
      { value: "∞", label: "continuous fabrication, cut to length" },
      { value: "100%", label: "weavable: sewn, braided, worn" },
      { value: "0 dB*", label: "silent operation, no moving parts" },
    ],
    sections: [
      { type: "heading", text: "The problem" },
      {
        type: "paragraph",
        text: "Integrating pressurised fluidic circuits into textiles would enable muscle support, thermoregulation and haptic feedback in a comfortably wearable form. But fiber fluidic components existed only for passive transport — tubes and connectors. Pressure generation remained confined to external, rigid and bulky pumps.",
      },
      { type: "heading", text: "The innovation" },
      {
        type: "paragraph",
        text: 'The fiber pump turns the pump itself into a thread: a soft thermoplastic-polyurethane tube with two continuous helical electrodes embedded in the wall. When voltage is applied, the charge-injection EHD mechanism generates pressure and flow along the full length of the fiber. The longer it is, the more pressure it produces: the pump is bought "by the metre" and cut to length.',
      },
      {
        type: "media",
        label: "Image — fiber pump sewn into a textile",
        caption:
          "Fig. 1 — The fiber is compatible with weaving, knitting and sewing: pressure is integrated directly into the garment.",
        url: "/papers/fiber-woven-array.jpg",
        width: 1755,
        height: 900,
      },
      {
        type: "media",
        label: "Image — fiber pump driving a fluidic circuit",
        caption:
          "Fig. 2 — A single fiber, under 2 mm across, pumps enough fluid to run a circuit on its own.",
        url: "/papers/fiber-pump-demo.jpg",
        width: 1280,
        height: 720,
      },
      { type: "heading", text: "The demonstrations" },
      {
        type: "paragraph",
        text: "The work demonstrates textiles that actively heat and cool the wearer, textile artificial muscles with an integrated pump for compression and muscle assistance, and wearable haptic circuits. The fiber keeps working even when stretched and bent, opening the way to genuinely portable textile exosuits.",
      },
    ],
    sort_order: 20,
    published: true,
  },
  {
    id: "stretchable-pumps-for-soft-machines",
    slug: "stretchable-pumps-for-soft-machines",
    title: "Stretchable pumps for soft machines",
    journal: "Nature",
    year: 2019,
    authors_short: "Cacucciolo, Shintake, Kuwajima, Maeda, Floreano, Shea.",
    authors_full:
      "V. Cacucciolo, J. Shintake, Y. Kuwajima, S. Maeda, D. Floreano, H. Shea",
    citation: "Nature 572, 516–519 (2019) — EPFL · Shibaura Institute of Technology",
    summary:
      "The world's first fully soft, stretchable pumps: they convert electricity directly into flow through electrohydrodynamics, with no moving parts. The result that opened the way to fluidic muscles free of external infrastructure.",
    abstract:
      "The world's first fully soft, stretchable pump: it converts electricity directly into flow through electrohydrodynamics, with no moving parts — the result that opened the way to fluidic muscles free of external infrastructure.",
    external_url: "https://www.nature.com/articles/s41586-019-1479-6",
    external_label: "Paper on Nature",
    extra_url: null,
    extra_label: null,
    media_label: "Image — stretchable pump",
    media_url: "/papers/stretchable-pumps-glove.jpg",
    media_width: 2560,
    media_height: 1707,
    facts: [
      { value: "First", label: "fully soft pump in the world" },
      { value: "0", label: "moving parts" },
      { value: "100%", label: "stretchable and bendable" },
      { value: "1 g", label: "order of magnitude of the weight" },
    ],
    sections: [
      { type: "heading", text: "The problem" },
      {
        type: "paragraph",
        text: "For over a decade, soft robotics has been developing artificial muscles driven by pressurised fluids. But the fluid has to be pumped, and conventional pumps are rigid, heavy and noisy, anchored outside the robot with tubes and compressors. A soft-bodied machine remained tethered to hard infrastructure — the bottleneck of the entire field.",
      },
      { type: "heading", text: "The innovation" },
      {
        type: "paragraph",
        text: "This research demonstrated the first fully soft, stretchable pump: an elastomer channel with flexible electrodes that moves fluid through electrohydrodynamics (EHD). An electric field injects charge into the dielectric liquid and the migrating ions drag the fluid along with them. No gears, no membrane, no rotor: pressure arises directly from electricity, in silence.",
      },
      {
        type: "media",
        label: "Image — stretchable pump bent between the fingers",
        caption:
          "Fig. 1 — The pump keeps its performance even when bent, twisted or stretched: it can be integrated into the robot's own body.",
      },
      { type: "heading", text: "Why it matters" },
      {
        type: "paragraph",
        text: "With a soft, lightweight and silent pump, the fluidic circuit can finally live inside the robot or inside a wearable garment. It is the result that opened the lab's research line on portable fluidic muscles — and the conceptual foundation from which, four years later, the fiber pumps would emerge.",
      },
    ],
    sort_order: 30,
    published: true,
  },
];

export const researchLines: ResearchLine[] = [
  {
    id: "line-01",
    number: "/01",
    title: "Fluidic artificial muscles",
    description:
      "Electrically driven fiber actuators — modular and scalable — for robots that move like living bodies.",
    sort_order: 10,
    published: true,
  },
  {
    id: "line-02",
    number: "/02",
    title: "Haptic gloves",
    description:
      "Wearable tactile feedback for telemanipulation: working with your hands thousands of kilometres away.",
    sort_order: 20,
    published: true,
  },
  {
    id: "line-03",
    number: "/03",
    title: "Thermoregulating clothing",
    description:
      "Fluidic circuits woven into garments that actively heat or cool the wearer.",
    sort_order: 30,
    published: true,
  },
  {
    id: "line-04",
    number: "/04",
    title: "Low-cost robotic hands",
    description:
      "Prosthetics and end-effectors driven by muscle fibers, with the linear configuration of natural muscle.",
    sort_order: 40,
    published: true,
  },
];

export const news: NewsItem[] = [
  {
    id: "japan-embassy-visit-2026",
    slug: "japan-embassy-visit-2026",
    title: "The Science & Technology Attaché of the Embassy of Japan visits the lab",
    category: "Visits",
    excerpt:
      "Dr. Masahiro Nakade, First Secretary and Science & Technology Attaché at the Embassy of Japan in Italy, came to see the laboratory: a tour of the research lines, and a conversation about what the Italian and Japanese research ecosystems can build together.",
    body: "The RoboPhysics Laboratory hosted Dr. Masahiro Nakade, First Secretary and Science & Technology Attaché at the Embassy of Japan in Italy.\n\nThe visit was an occasion to introduce the laboratory and show the work as it stands: the research lines currently running, the technologies developed here, and the scientific problems that are shaping them. Seeing the devices in person tends to make the questions sharper than any presentation does.\n\nWhat made the conversation worth having was the interest in how the Italian and Japanese research ecosystems might connect — where the two overlap, and where a collaboration would actually add something. Meetings like this one are how those possibilities start: not with an agreement, but with people in a room who understand each other's work.\n\nWe thank Dr. Nakade for the visit and for a genuinely stimulating discussion.",
    image_url: "/news/japan-embassy-visit.jpg",
    image_label: "Photo — the lab team with Dr. Masahiro Nakade",
    gallery: [],
    source_url:
      "https://www.linkedin.com/feed/update/urn:li:activity:7508041142039474177",
    source_label: "See the post on LinkedIn",
    published_at: "2026-09-17T00:00:00.000Z",
    published: true,
  },
  {
    id: "team-building-laino-borgo-2026",
    slug: "team-building-laino-borgo-2026",
    title: "Two days outside the lab: the team retreat in Laino Borgo",
    category: "Life at RPL",
    excerpt:
      "The whole lab left the benches behind for two days on the Lao river, in the Pollino National Park: working sessions under the trees, rafting, and time to decide together where the lab is heading.",
    body: "For two days in July the RoboPhysics Laboratory moved out of the department and into Laino Borgo, on the Lao river in the Pollino National Park.\n\nThe format was deliberately simple: long tables under the trees, paper and markers instead of screens, and a schedule with enough space in it to let conversations run. The sessions asked the questions that never quite fit into an ordinary week — how the group works together, what each research line needs next, and what the lab should look like a few years from now. PhD students, postdocs and MSc students all took the floor, which is harder to arrange in a corridor than around a table by a river.\n\nBetween sessions came the other half of the point. The group ran the rapids of the Lao with Pollino Rafting, walked up to the waterfall, and ate together at the long table well into the evening. Sharing a raft turns out to be a fast way to learn how a team distributes effort.\n\nThe retreat has become a fixed appointment in the life of the lab: a way of remembering that a research group is a group of people first, and that some of the best thinking happens a long way from the instruments.",
    image_url: "/news/outing-toast.jpg",
    image_label: "Photo — the group at the long table",
    gallery: [
      {
        url: "/news/outing-cover.jpg",
        label: "Photo — the team at the waterfall in rafting gear",
      },
      {
        url: "/news/outing-rafting.jpg",
        label: "Photo — rafting the rapids of the Lao river",
      },
      {
        url: "/news/outing-working-session.jpg",
        label: "Photo — working session at the tables under the trees",
      },
      {
        url: "/news/outing-notes.jpg",
        label: "Photo — taking notes during a session",
      },
    ],
    source_url: "https://www.instagram.com/p/DbIhy1uCH1y/",
    source_label: "See the photos on Instagram",
    // TODO: giorno esatto da confermare — il carosello dà solo "Laino Borgo
    // 2026" e il post Instagram non è leggibile senza login.
    published_at: "2026-07-01T00:00:00.000Z",
    published: true,
  },
  {
    id: "robosoft-competition-2026-kanazawa",
    slug: "robosoft-competition-2026-kanazawa",
    title: "RPL wins the RoboSoft Competition 2026 in Kanazawa",
    category: "Awards",
    excerpt:
      "The lab's student team takes first place at the international IEEE RoboSoft soft-robotics competition in Japan, with a manipulation system based on the lab's technologies.",
    body: "The RoboPhysics Laboratory student team took first place at the IEEE RoboSoft 2026 competition in Kanazawa, Japan, competing against university teams from across the international soft-robotics community.\n\nThe winning entry was a manipulation system built on technologies developed in the lab: fluidic actuators driven by electro-active fluids, paired with electroadhesive gripping surfaces. The system had to grasp, move and release objects of very different shape, weight and fragility — the kind of task where rigid grippers force a trade-off between force and delicacy.\n\nThe team was led on the technical side by Angelo Catalano and included MSc students Elisabetta Annese, Luca Mitaritonna and Giuseppe Macchia, each of whom brought a thesis strand into the build: soft manipulation, electroadhesive grippers and fluidic-actuator control.",
    image_url: "/news/robosoft-kanazawa.jpg",
    image_label: "Photo — team in Kanazawa",
    gallery: [],
    source_url: null,
    source_label: null,
    published_at: "2026-04-18T00:00:00.000Z",
    published: true,
  },
  {
    id: "electrofluidic-fiber-muscles-science-robotics",
    slug: "electrofluidic-fiber-muscles-science-robotics",
    title: "Electrofluidic fiber muscles in Science Robotics",
    category: "Publications",
    excerpt:
      "With the MIT Media Lab we present a new class of fiber-format artificial muscles: electric, silent and free of external pumps, with power density comparable to skeletal muscle.",
    body: "Our work with the MIT Media Lab on electrofluidic fiber muscles is out in Science Robotics.\n\nThe paper introduces a class of artificial muscles in fiber format that integrates charge-injection fiber pumps and thin McKibben actuators into a single closed fluidic circuit. Because the pump lives inside the muscle, the system needs no external compressor and no tubes running off-body: it is electric, silent and untethered.\n\nThe central finding concerns bias pressure. By pre-pressurising the circuit, the modular muscles reach a power density comparable to that of skeletal muscle — the benchmark the field has been chasing for decades. Woven in antagonistic pairs, one fiber contracts while the other extends, reproducing the biceps–triceps arrangement of the human arm.\n\nThe work is authored by Ozgun Kilic Afsar, Gabriele Pupillo, Gennaro Vitucci, Wedyan Babatain, Hiroshi Ishii and Vito Cacucciolo, with the support of the European Research Council.",
    image_url: "/news/mit-media-lab.jpg",
    image_label: "Photo — fiber muscle in hand",
    gallery: [],
    source_url: null,
    source_label: null,
    published_at: "2026-04-02T00:00:00.000Z",
    published: true,
  },
  {
    id: "erc-starting-grant-robofluid",
    slug: "erc-starting-grant-robofluid",
    title: "ERC Starting Grant for the RoboFluid project",
    category: "Funding",
    excerpt:
      "The European Research Council funds €1.5 million of research on soft and wearable robotics driven by electro-active fluids: thermoregulating garments, haptic gloves and low-cost robotic hands.",
    body: "The European Research Council has awarded a Starting Grant to Prof. Vito Cacucciolo for RoboFluid, funding €1.5 million of research at Politecnico di Bari over five years.\n\nRoboFluid asks what becomes possible when the pump stops being external hardware and becomes part of the machine's own body. The project runs along four lines: fluidic artificial muscles in fiber format, haptic gloves for telemanipulation, thermoregulating clothing with woven fluidic circuits, and low-cost robotic hands driven by muscle fibers.\n\nThe grant established the RoboPhysics Laboratory in its current form and funds the PhD positions and postdoctoral research now working across those lines.",
    image_url: "/news/erc-robofluid.jpg",
    image_label: "Photo — Prof. Cacucciolo in the lab",
    gallery: [],
    source_url: null,
    source_label: null,
    published_at: "2023-09-01T00:00:00.000Z",
    published: true,
  },
];

/**
 * I titoli sono quelli reali su YouTube. Tre video vengono dai canali EPFL e
 * LMTS, il laboratorio dove sono nate le pompe: l'attribuzione è in fondo
 * alla descrizione, perché il video non è del RoboPhysics Laboratory.
 */
export const videos: Video[] = [
  {
    id: "electrofluidic-fiber-muscles",
    slug: "electrofluidic-fiber-muscles",
    title: "Electrofluidic Fiber Muscles, Science Robotics, 2026",
    youtube_id: "_tOTOjzNouU",
    category: "Research",
    date_label: "2026",
    description:
      "Antagonistic woven muscle pairs contracting and extending — the work published in Science Robotics with the MIT Media Lab.",
    thumb_label: "YouTube — electrofluidic fiber muscles",
    sort_order: 10,
    published: true,
  },
  {
    id: "fiber-pumps-haptics-wearables",
    slug: "fiber-pumps-haptics-wearables",
    title: "Fiber-like pumps to power haptics devices and wearables",
    youtube_id: "forx6TA_1wg",
    category: "Research",
    date_label: "2023",
    description:
      "The fiber pump published in Science: a soft tube 2 mm across that generates pressure along its own length. Video: EPFL.",
    thumb_label: "YouTube — fiber pumps",
    sort_order: 20,
    published: true,
  },
  {
    id: "miniature-stretchable-pump",
    slug: "miniature-stretchable-pump",
    title: "A miniature stretchable pump for the next generation of soft robots",
    youtube_id: "knOsNjW3Wu0",
    category: "Research",
    date_label: "2019",
    description:
      "The stretchable pump published in Nature: electricity becomes flow with no moving parts. Video: EPFL.",
    thumb_label: "YouTube — stretchable pump",
    sort_order: 30,
    published: true,
  },
  {
    id: "thermoregulatory-clothing",
    slug: "thermoregulatory-clothing",
    title: "Untethered thermoregulatory clothing using EHD fiber pumps",
    youtube_id: "T3SxOuonEo8",
    category: "Research",
    date_label: "2023",
    description:
      "Fluidic circuits woven into a garment that heats and cools the wearer, with no external pump. Video: LMTS, EPFL.",
    thumb_label: "YouTube — thermoregulatory clothing",
    sort_order: 40,
    published: true,
  },
  {
    id: "soft-gripper-students-team",
    slug: "soft-gripper-students-team",
    title: "Soft gripper at RPL — students team",
    youtube_id: "Sc7ZjtkbgKY",
    category: "Lab",
    date_label: "2026",
    description:
      "The soft manipulation system built by the lab's student team, the technology behind the RoboSoft entry.",
    thumb_label: "YouTube — soft gripper at RPL",
    sort_order: 50,
    published: true,
  },
  {
    id: "electroadhesion-delicate-fruit",
    slug: "electroadhesion-delicate-fruit",
    title: "Electroadhesion soft gripper grasping delicate fruit",
    youtube_id: "OsWaUnG030E",
    category: "Spin-off",
    date_label: "2026",
    description:
      "Electroadhesive gripping picks up fruit without bruising it: the line that led to the spin-off OmniGrasp.",
    thumb_label: "YouTube — electroadhesion soft gripper",
    sort_order: 60,
    published: true,
  },
];
