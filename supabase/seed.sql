-- ============================================================================
-- RoboPhysics Laboratory — contenuti (dal wireframe rpl-site-wireframe-en.html)
-- Eseguire dopo schema.sql. Rieseguibile: aggiorna per slug, non duplica.
-- ============================================================================

-- ----------------------------------------------------------------- people --
-- Usciti dal gruppo: la seed è rieseguibile, quindi vanno tolti esplicitamente.
delete from public.people where slug in ('gabriele-pupillo', 'gennaro-vitucci', 'phd-slot');

insert into public.people (slug, name, role, role_group, bio, photo_url, photo_label, profile_url, sort_order) values
  ('vito-cacucciolo', 'Vito Cacucciolo', 'Principal Investigator', 'pi',
   $t$Professor at Politecnico di Bari (DMMM). ERC Starting Grant holder with the RoboFluid project. Co-inventor of stretchable pumps (Nature, 2019) and fiber pumps (Science, 2023). Founder of the spin-off OmniGrasp.$t$,
   '/people/vito-cacucciolo.jpg', 'Portrait photo',
   'https://www.linkedin.com/in/vito-cacucciolo/', 10),

  ('yu-kuwajima', 'Yu Kuwajima', 'Assistant Professor / RTDA', 'researchers',
   $t$Soft pumps and electrofluidics. Co-author of the stretchable pumps (Nature, 2019); now working on electro-active fluids for wearable robotics within the RoboFluid project.$t$,
   '/people/yu-kuwajima.jpg', 'Portrait photo', 'https://www.linkedin.com/in/kuwajima-yu-313662308/', 20),

  ('angelo-catalano', 'Angelo Catalano', 'PhD Student', 'phd',
   $t$PhD candidate on robots-as-a-service for digital industry. Technical team leader in the winning entry at the RoboSoft Competition 2026 in Kanazawa.$t$,
   '/people/angelo-catalano.jpg', 'Portrait photo', 'https://www.linkedin.com/in/-angelo-catalano/', 55),

  ('andrea-castellaneta', 'Andrea Castellaneta', 'PhD Student', 'phd',
   $t$Soft and wearable robotics powered by electro-active fluids, within the ERC RoboFluid project and the national PhD programme in Autonomous Systems (DAuSy).$t$,
   '/people/andrea-castellaneta.jpg', 'Portrait photo', 'https://www.linkedin.com/in/andreacastellaneta1/', 60),

  ('cesare-cariddi', 'Cesare Cariddi', 'PhD Student', 'phd',
   $t$Within the ERC RoboFluid project and the national PhD programme in Autonomous Systems (DAuSy).$t$,
   '/people/cesare-cariddi.jpg', 'Portrait photo', 'https://www.linkedin.com/in/cesare-cariddi-7982a92bb/', 70),

  ('elisabetta-annese', 'Elisabetta Annese', 'MSc Student', 'students',
   $t$Member of the winning team at the RoboSoft Competition 2026 (Kanazawa, Japan). Thesis on soft manipulation.$t$,
   null, 'Portrait photo', null, 80),

  ('luca-mitaritonna', 'Luca Mitaritonna', 'MSc Student', 'students',
   $t$Member of the winning team at the RoboSoft Competition 2026 (Kanazawa, Japan). Thesis on electroadhesive grippers.$t$,
   null, 'Portrait photo', null, 90),

  ('giuseppe-macchia', 'Giuseppe Macchia', 'MSc Student', 'students',
   $t$Member of the winning team at the RoboSoft Competition 2026 (Kanazawa, Japan). Thesis on fluidic-actuator control.$t$,
   null, 'Portrait photo', null, 100),

  -- Bio ancora da scrivere: la card mostra nome, ruolo e link.
  ('simone-de-carolis', 'Simone De Carolis', 'Assistant Professor / RTDA', 'researchers',
   '',
   '/people/simone-de-carolis.jpg', 'Portrait photo',
   'https://www.linkedin.com/in/simone-de-carolis-3b9a3011b/', 45),

  ('angelica-de-michele', 'Angelica De Michele', 'MSc Student', 'students',
   $t$Master of Science in Mechatronics and Robotics Engineering Student | Bachelor’s Degree in Mechanical Engineering$t$,
   '/people/angelica-de-michele.jpg', 'Portrait photo',
   'https://www.linkedin.com/in/angelica-de-michele-5713052b5/', 75),

  ('nicola-creanza', 'Nicola Creanza', 'MSc Student / Lab Manager', 'students',
   $t$Master of Science in Mechatronics and Robotics Engineering Student | Bachelor’s Degree in Mechanical Engineering$t$,
   '/people/nicola-creanza.jpg', 'Portrait photo',
   'https://www.linkedin.com/in/nicola-creanza-9509b7255/', 78),

  -- Segnaposto: le sezioni Visitors e Alumni compaiono solo se hanno righe.
  -- Il testo fra parentesi quadre dice cosa ci va; vanno sostituiti o tolti.
  ('visitor-slot-1', '[Name Surname]', 'Visiting Researcher', 'visitors',
   $t$[Home institution, period of the stay and topic worked on in the lab.]$t$,
   null, 'Portrait photo', null, 110),

  ('visitor-slot-2', '[Name Surname]', 'Visiting PhD Student', 'visitors',
   $t$[Home institution, period of the stay and topic worked on in the lab.]$t$,
   null, 'Portrait photo', null, 120),

  ('alumni-slot-1', '[Name Surname]', '[Role in the lab, years]', 'alumni',
   $t$[What they worked on here, and where they are now.]$t$,
   null, 'Portrait photo', null, 130),

  ('alumni-slot-2', '[Name Surname]', '[Role in the lab, years]', 'alumni',
   $t$[What they worked on here, and where they are now.]$t$,
   null, 'Portrait photo', null, 140)
on conflict (slug) do update set
  name = excluded.name, role = excluded.role, role_group = excluded.role_group,
  bio = excluded.bio, photo_url = excluded.photo_url,
  photo_label = excluded.photo_label, profile_url = excluded.profile_url,
  sort_order = excluded.sort_order;

-- ----------------------------------------------------------------- papers --
insert into public.papers (
  slug, title, journal, year, authors_short, authors_full, citation,
  summary, abstract, external_url, external_label, extra_url, extra_label,
  media_label, media_url, media_width, media_height, facts, sections, sort_order
) values
  (
    'electrofluidic-fiber-muscles',
    'Electrofluidic fiber muscles',
    'Science Robotics', 2026,
    'Kilic Afsar, Pupillo, Vitucci, Babatain, Ishii, Cacucciolo.',
    'O. Kilic Afsar, G. Pupillo, G. Vitucci, W. Babatain, H. Ishii, V. Cacucciolo',
    'Science Robotics (2026) — MIT Media Lab · Politecnico di Bari · Co-funded by the European Research Council',
    $t$With the MIT Media Lab: a new class of fiber-format artificial muscles that integrates fiber pumps and McKibben actuators in a closed circuit. Electric, silent and untethered, they pair up in antagonistic configurations like biological muscle and, thanks to bias pressure, reach power densities comparable to skeletal muscle.$t$,
    $t$A new class of fiber-format artificial muscles integrating charge-injection fiber pumps and McKibben actuators in a closed circuit — electric, silent and untethered, with a power density comparable to skeletal muscle.$t$,
    'https://www.science.org/doi/10.1126/scirobotics.ady6438', 'Paper on Science Robotics',
    'https://www.media.mit.edu/projects/electrofluidicmuscle/overview/', 'Project at the MIT Media Lab',
    'Image — electrofluidic fiber muscle', '/papers/woven-muscle-pair.png', 1400, 356,
    $j$[
      {"value": "~1 mm",     "label": "muscle-fiber scale, weavable into textiles"},
      {"value": "900 kPa/m", "label": "pressure generated by the integrated fiber pumps"},
      {"value": "<200 ms",   "label": "response time with pumps in parallel"},
      {"value": "≈ muscle",  "label": "power density comparable to skeletal muscle"}
    ]$j$::jsonb,
    $j$[
      {"type": "heading",   "text": "The problem"},
      {"type": "paragraph", "text": "Muscles are extraordinarily effective systems for generating controlled force, and engineering has struggled for decades to match their combination of power, speed, scalability and control. Fluidic actuators come close, but depend on heavy, noisy external hydraulic infrastructure. And the electric motors of today's robots produce rotation on a shaft — a configuration fundamentally different from the linear contraction of natural muscle."},
      {"type": "heading",   "text": "The innovation"},
      {"type": "paragraph", "text": "The electrofluidic fiber muscles (EFM) close the loop on the two earlier research lines: the charge-injection fiber pumps are integrated directly into the muscle system, in a closed fluidic circuit with thin McKibben actuators. A millimetre-scale pump sits between two actuators, pushing fluid into one to contract it while the other relaxes. The result is an electric, silent and untethered muscle: no external pumps, compressors or tubes."},
      {"type": "media",     "label": "Video still — antagonistic pair in motion", "caption": "Fig. 1 — Antagonistic configuration: one fiber contracts while the other extends, like the biceps and triceps in the arm.", "url": "/untethered-woven.webp", "width": 760, "height": 428},
      {"type": "heading",   "text": "Like real muscle"},
      {"type": "paragraph", "text": "Like the fibers that bundle together in biological muscle, the EFMs combine in different configurations depending on the task. A key finding is the role of bias pressure: by pre-pressurising the circuit, the modular muscles reach a power density comparable to that of skeletal muscle. Each fiber weighs a few grams and is not much thicker than a toothpick; woven together, they form flat muscle pairs that can be integrated into textiles."},
      {"type": "media",     "label": "Image — woven textile muscle pair", "caption": "Fig. 2 — Textile muscle pairs: McKibben actuators and fiber pumps braided into a single active fabric.", "url": "/papers/woven-muscle-pair.png", "width": 1400, "height": 356},
      {"type": "video",     "youtube_id": "_tOTOjzNouU", "label": "Video — electrofluidic fiber muscles", "caption": "The muscles in motion: contraction, extension and the antagonistic pairs described above."},
      {"type": "heading",   "text": "The applications"},
      {"type": "paragraph", "text": "The fiber format is particularly suited to wearable applications: exosuits that assist load lifting, devices that restore or augment the dexterity of the hand, prosthetics with the linear configuration of natural muscle. But the principles extend to fluidic robotic systems in general — from soft manipulation to robots that collaborate safely with people."}
    ]$j$::jsonb,
    10
  ),
  (
    'fiber-pumps-wearable-fluidic-systems',
    'Fiber pumps for wearable fluidic systems',
    'Science', 2023,
    'Smith, Cacucciolo, Shea.',
    'M. Smith, V. Cacucciolo, H. Shea',
    'Science 379, 1327–1332 (2023) — EPFL',
    $t$The pump becomes a fiber: a soft tube 2 mm in diameter with helical electrodes embedded in the wall, produced continuously and weavable like a thread. It integrates pressurised fluidic circuits directly into garments and textiles, for thermoregulation, muscle support and haptic feedback.$t$,
    $t$A soft 2 mm tube with helical electrodes embedded in the wall, produced continuously and weavable like a thread — bringing pressurised fluidic circuits directly into garments for thermoregulation, muscle support and haptic feedback.$t$,
    'https://www.science.org/doi/10.1126/science.ade8654', 'Paper on Science',
    null, null,
    'Image — fiber pump in textile', '/papers/fiber-pump.jpg', 1920, 1080,
    $j$[
      {"value": "2 mm",  "label": "in diameter: a pump in the form of a thread"},
      {"value": "∞",     "label": "continuous fabrication, cut to length"},
      {"value": "100%",  "label": "weavable: sewn, braided, worn"},
      {"value": "0 dB*", "label": "silent operation, no moving parts"}
    ]$j$::jsonb,
    $j$[
      {"type": "heading",   "text": "The problem"},
      {"type": "paragraph", "text": "Integrating pressurised fluidic circuits into textiles would enable muscle support, thermoregulation and haptic feedback in a comfortably wearable form. But fiber fluidic components existed only for passive transport — tubes and connectors. Pressure generation remained confined to external, rigid and bulky pumps."},
      {"type": "heading",   "text": "The innovation"},
      {"type": "paragraph", "text": "The fiber pump turns the pump itself into a thread: a soft thermoplastic-polyurethane tube with two continuous helical electrodes embedded in the wall. When voltage is applied, the charge-injection EHD mechanism generates pressure and flow along the full length of the fiber. The longer it is, the more pressure it produces: the pump is bought \"by the metre\" and cut to length."},
      {"type": "media",     "label": "Image — fiber pump sewn into a textile", "caption": "Fig. 1 — The fiber is compatible with weaving, knitting and sewing: pressure is integrated directly into the garment.", "url": "/papers/fiber-woven-array.jpg", "width": 1755, "height": 900},
      {"type": "media",     "label": "Image — fiber pump driving a fluidic circuit", "caption": "Fig. 2 — A single fiber, under 2 mm across, pumps enough fluid to run a circuit on its own.", "url": "/papers/fiber-pump-demo.jpg", "width": 1280, "height": 720},
      {"type": "heading",   "text": "The demonstrations"},
      {"type": "paragraph", "text": "The work demonstrates textiles that actively heat and cool the wearer, textile artificial muscles with an integrated pump for compression and muscle assistance, and wearable haptic circuits. The fiber keeps working even when stretched and bent, opening the way to genuinely portable textile exosuits."}
    ]$j$::jsonb,
    20
  ),
  (
    'stretchable-pumps-for-soft-machines',
    'Stretchable pumps for soft machines',
    'Nature', 2019,
    'Cacucciolo, Shintake, Kuwajima, Maeda, Floreano, Shea.',
    'V. Cacucciolo, J. Shintake, Y. Kuwajima, S. Maeda, D. Floreano, H. Shea',
    'Nature 572, 516–519 (2019) — EPFL · Shibaura Institute of Technology',
    $t$The world's first fully soft, stretchable pumps: they convert electricity directly into flow through electrohydrodynamics, with no moving parts. The result that opened the way to fluidic muscles free of external infrastructure.$t$,
    $t$The world's first fully soft, stretchable pump: it converts electricity directly into flow through electrohydrodynamics, with no moving parts — the result that opened the way to fluidic muscles free of external infrastructure.$t$,
    'https://www.nature.com/articles/s41586-019-1479-6', 'Paper on Nature',
    null, null,
    'Image — stretchable pump', '/papers/stretchable-pumps-glove.jpg', 2560, 1707,
    $j$[
      {"value": "First", "label": "fully soft pump in the world"},
      {"value": "0",     "label": "moving parts"},
      {"value": "100%",  "label": "stretchable and bendable"},
      {"value": "1 g",   "label": "order of magnitude of the weight"}
    ]$j$::jsonb,
    $j$[
      {"type": "heading",   "text": "The problem"},
      {"type": "paragraph", "text": "For over a decade, soft robotics has been developing artificial muscles driven by pressurised fluids. But the fluid has to be pumped, and conventional pumps are rigid, heavy and noisy, anchored outside the robot with tubes and compressors. A soft-bodied machine remained tethered to hard infrastructure — the bottleneck of the entire field."},
      {"type": "heading",   "text": "The innovation"},
      {"type": "paragraph", "text": "This research demonstrated the first fully soft, stretchable pump: an elastomer channel with flexible electrodes that moves fluid through electrohydrodynamics (EHD). An electric field injects charge into the dielectric liquid and the migrating ions drag the fluid along with them. No gears, no membrane, no rotor: pressure arises directly from electricity, in silence."},
      {"type": "media",     "label": "Image — stretchable pump bent between the fingers", "caption": "Fig. 1 — The pump keeps its performance even when bent, twisted or stretched: it can be integrated into the robot's own body."},
      {"type": "heading",   "text": "Why it matters"},
      {"type": "paragraph", "text": "With a soft, lightweight and silent pump, the fluidic circuit can finally live inside the robot or inside a wearable garment. It is the result that opened the lab's research line on portable fluidic muscles — and the conceptual foundation from which, four years later, the fiber pumps would emerge."}
    ]$j$::jsonb,
    30
  )
on conflict (slug) do update set
  title = excluded.title, journal = excluded.journal, year = excluded.year,
  authors_short = excluded.authors_short, authors_full = excluded.authors_full,
  citation = excluded.citation, summary = excluded.summary, abstract = excluded.abstract,
  external_url = excluded.external_url, external_label = excluded.external_label,
  extra_url = excluded.extra_url, extra_label = excluded.extra_label,
  media_label = excluded.media_label, media_url = excluded.media_url,
  media_width = excluded.media_width, media_height = excluded.media_height,
  facts = excluded.facts,
  sections = excluded.sections, sort_order = excluded.sort_order;

-- --------------------------------------------------------- research_lines --
insert into public.research_lines (number, title, description, sort_order) values
  ('/01', 'Fluidic artificial muscles',
   $t$Electrically driven fiber actuators — modular and scalable — for robots that move like living bodies.$t$, 10),
  ('/02', 'Haptic gloves',
   $t$Wearable tactile feedback for telemanipulation: working with your hands thousands of kilometres away.$t$, 20),
  ('/03', 'Thermoregulating clothing',
   $t$Fluidic circuits woven into garments that actively heat or cool the wearer.$t$, 30),
  ('/04', 'Low-cost robotic hands',
   $t$Prosthetics and end-effectors driven by muscle fibers, with the linear configuration of natural muscle.$t$, 40)
on conflict do nothing;

-- ------------------------------------------------------------------- news --
insert into public.news (slug, title, category, excerpt, body, image_url, image_label, gallery, source_url, source_label, published_at) values
  (
    'team-building-laino-borgo-2026',
    'Two days outside the lab: the team retreat in Laino Borgo',
    'Life at RPL',
    $t$The whole lab left the benches behind for two days on the Lao river, in the Pollino National Park: working sessions under the trees, rafting, and time to decide together where the lab is heading.$t$,
    $t$For two days in July the RoboPhysics Laboratory moved out of the department and into Laino Borgo, on the Lao river in the Pollino National Park.

The format was deliberately simple: long tables under the trees, paper and markers instead of screens, and a schedule with enough space in it to let conversations run. The sessions asked the questions that never quite fit into an ordinary week — how the group works together, what each research line needs next, and what the lab should look like a few years from now. PhD students, postdocs and MSc students all took the floor, which is harder to arrange in a corridor than around a table by a river.

Between sessions came the other half of the point. The group ran the rapids of the Lao with Pollino Rafting, walked up to the waterfall, and ate together at the long table well into the evening. Sharing a raft turns out to be a fast way to learn how a team distributes effort.

The retreat has become a fixed appointment in the life of the lab: a way of remembering that a research group is a group of people first, and that some of the best thinking happens a long way from the instruments.$t$,
    '/news/outing-toast.jpg', 'Photo — the group at the long table',
    $j$[
      { "url": "/news/outing-cover.jpg",           "label": "Photo — the team at the waterfall in rafting gear" },
      { "url": "/news/outing-rafting.jpg",         "label": "Photo — rafting the rapids of the Lao river" },
      { "url": "/news/outing-working-session.jpg", "label": "Photo — working session at the tables under the trees" },
      { "url": "/news/outing-notes.jpg",           "label": "Photo — taking notes during a session" }
    ]$j$::jsonb,
    'https://www.instagram.com/p/DbIhy1uCH1y/', 'See the photos on Instagram',
    -- TODO: giorno esatto da confermare (il carosello dà solo l'anno).
    '2026-07-01'
  ),
  (
    'robosoft-competition-2026-kanazawa',
    'RPL wins the RoboSoft Competition 2026 in Kanazawa',
    'Awards',
    $t$The lab's student team takes first place at the international IEEE RoboSoft soft-robotics competition in Japan, with a manipulation system based on the lab's technologies.$t$,
    $t$The RoboPhysics Laboratory student team took first place at the IEEE RoboSoft 2026 competition in Kanazawa, Japan, competing against university teams from across the international soft-robotics community.

The winning entry was a manipulation system built on technologies developed in the lab: fluidic actuators driven by electro-active fluids, paired with electroadhesive gripping surfaces. The system had to grasp, move and release objects of very different shape, weight and fragility — the kind of task where rigid grippers force a trade-off between force and delicacy.

The team was led on the technical side by Angelo Catalano and included MSc students Elisabetta Annese, Luca Mitaritonna and Giuseppe Macchia, each of whom brought a thesis strand into the build: soft manipulation, electroadhesive grippers and fluidic-actuator control.$t$,
    '/news/robosoft-kanazawa.jpg', 'Photo — team in Kanazawa',
    '[]'::jsonb, null, null,
    '2026-04-18'
  ),
  (
    'electrofluidic-fiber-muscles-science-robotics',
    'Electrofluidic fiber muscles in Science Robotics',
    'Publications',
    $t$With the MIT Media Lab we present a new class of fiber-format artificial muscles: electric, silent and free of external pumps, with power density comparable to skeletal muscle.$t$,
    $t$Our work with the MIT Media Lab on electrofluidic fiber muscles is out in Science Robotics.

The paper introduces a class of artificial muscles in fiber format that integrates charge-injection fiber pumps and thin McKibben actuators into a single closed fluidic circuit. Because the pump lives inside the muscle, the system needs no external compressor and no tubes running off-body: it is electric, silent and untethered.

The central finding concerns bias pressure. By pre-pressurising the circuit, the modular muscles reach a power density comparable to that of skeletal muscle — the benchmark the field has been chasing for decades. Woven in antagonistic pairs, one fiber contracts while the other extends, reproducing the biceps–triceps arrangement of the human arm.

The work is authored by Ozgun Kilic Afsar, Gabriele Pupillo, Gennaro Vitucci, Wedyan Babatain, Hiroshi Ishii and Vito Cacucciolo, with the support of the European Research Council.$t$,
    '/news/mit-media-lab.jpg', 'Photo — fiber muscle in hand',
    '[]'::jsonb, null, null,
    '2026-04-02'
  ),
  (
    'erc-starting-grant-robofluid',
    'ERC Starting Grant for the RoboFluid project',
    'Funding',
    $t$The European Research Council funds €1.5 million of research on soft and wearable robotics driven by electro-active fluids: thermoregulating garments, haptic gloves and low-cost robotic hands.$t$,
    $t$The European Research Council has awarded a Starting Grant to Prof. Vito Cacucciolo for RoboFluid, funding €1.5 million of research at Politecnico di Bari over five years.

RoboFluid asks what becomes possible when the pump stops being external hardware and becomes part of the machine's own body. The project runs along four lines: fluidic artificial muscles in fiber format, haptic gloves for telemanipulation, thermoregulating clothing with woven fluidic circuits, and low-cost robotic hands driven by muscle fibers.

The grant established the RoboPhysics Laboratory in its current form and funds the PhD positions and postdoctoral research now working across those lines.$t$,
    '/news/erc-robofluid.jpg', 'Photo — Prof. Cacucciolo in the lab',
    '[]'::jsonb, null, null,
    '2023-09-01'
  )
on conflict (slug) do update set
  title = excluded.title, category = excluded.category, excerpt = excluded.excerpt,
  body = excluded.body, image_url = excluded.image_url,
  image_label = excluded.image_label,
  published_at = excluded.published_at;

-- ----------------------------------------------------------------- videos --
-- Titoli reali da YouTube. Tre video sono dei canali EPFL e LMTS, dove sono
-- nate le pompe: l'attribuzione è in fondo alla descrizione.
insert into public.videos (slug, title, youtube_id, category, date_label, description, thumb_label, sort_order) values
  ('electrofluidic-fiber-muscles', 'Electrofluidic Fiber Muscles, Science Robotics, 2026', '_tOTOjzNouU', 'Research', '2026',
   $t$Antagonistic woven muscle pairs contracting and extending — the work published in Science Robotics with the MIT Media Lab.$t$,
   'YouTube — electrofluidic fiber muscles', 10),
  ('fiber-pumps-haptics-wearables', 'Fiber-like pumps to power haptics devices and wearables', 'forx6TA_1wg', 'Research', '2023',
   $t$The fiber pump published in Science: a soft tube 2 mm across that generates pressure along its own length. Video: EPFL.$t$,
   'YouTube — fiber pumps', 20),
  ('miniature-stretchable-pump', 'A miniature stretchable pump for the next generation of soft robots', 'knOsNjW3Wu0', 'Research', '2019',
   $t$The stretchable pump published in Nature: electricity becomes flow with no moving parts. Video: EPFL.$t$,
   'YouTube — stretchable pump', 30),
  ('thermoregulatory-clothing', 'Untethered thermoregulatory clothing using EHD fiber pumps', 'T3SxOuonEo8', 'Research', '2023',
   $t$Fluidic circuits woven into a garment that heats and cools the wearer, with no external pump. Video: LMTS, EPFL.$t$,
   'YouTube — thermoregulatory clothing', 40),
  ('soft-gripper-students-team', 'Soft gripper at RPL — students team', 'Sc7ZjtkbgKY', 'Lab', '2026',
   $t$The soft manipulation system built by the lab's student team, the technology behind the RoboSoft entry.$t$,
   'YouTube — soft gripper at RPL', 50),
  ('electroadhesion-delicate-fruit', 'Electroadhesion soft gripper grasping delicate fruit', 'OsWaUnG030E', 'Spin-off', '2026',
   $t$Electroadhesive gripping picks up fruit without bruising it: the line that led to the spin-off OmniGrasp.$t$,
   'YouTube — electroadhesion soft gripper', 60)
on conflict (slug) do update set
  title = excluded.title, youtube_id = excluded.youtube_id, category = excluded.category,
  date_label = excluded.date_label, description = excluded.description,
  thumb_label = excluded.thumb_label, sort_order = excluded.sort_order;
