/**
 * Ideal angle definitions for each yoga asana.
 * Each joint has: ideal angle (degrees), tolerance (±), feedback messages, weight.
 *
 * Keypoint indices (MediaPipe Pose):
 * 0=nose, 11=left_shoulder, 12=right_shoulder,
 * 13=left_elbow, 14=right_elbow, 15=left_wrist, 16=right_wrist
 * 23=left_hip, 24=right_hip, 25=left_knee, 26=right_knee
 * 27=left_ankle, 28=right_ankle
 */

export const POSES = {
  tadasana: {
    id: 'tadasana',
    name: 'Tadasana',
    sanskrit: 'ताडासन',
    english: 'Mountain Pose',
    difficulty: 'Beginner',
    description: 'The foundation of all standing poses — align your body from head to toe.',
    benefits: ['Improves posture', 'Strengthens thighs', 'Reduces flat feet'],
    guidance: [
      'Stand with feet together',
      'Weight evenly distributed',
      'Arms at sides, palms forward',
      'Crown of head rising',
    ],
    youtubeUrl: 'https://www.youtube.com/embed/CTrRX7DcBSA?si=a-QtVJOdz6hG-kJr',
    color: '#f97316',
    joints: [
      {
        name: 'Left Knee',
        points: [23, 25, 27], // hip-knee-ankle
        ideal: 175,
        tolerance: 10,
        weight: 1.5,
        feedbackHigh: 'Straighten your left leg — avoid bending the knee',
        feedbackLow: 'Release over-extension in your left knee',
      },
      {
        name: 'Right Knee',
        points: [24, 26, 28],
        ideal: 175,
        tolerance: 10,
        weight: 1.5,
        feedbackHigh: 'Straighten your right leg — avoid bending the knee',
        feedbackLow: 'Release over-extension in your right knee',
      },
      {
        name: 'Left Elbow',
        points: [11, 13, 15],
        ideal: 170,
        tolerance: 15,
        weight: 1.0,
        feedbackHigh: 'Extend your left arm fully alongside your body',
        feedbackLow: 'Relax your left arm — avoid tensing the elbow',
      },
      {
        name: 'Right Elbow',
        points: [12, 14, 16],
        ideal: 170,
        tolerance: 15,
        weight: 1.0,
        feedbackHigh: 'Extend your right arm fully alongside your body',
        feedbackLow: 'Relax your right arm — avoid tensing the elbow',
      },
      {
        name: 'Left Hip',
        points: [11, 23, 25],
        ideal: 175,
        tolerance: 10,
        weight: 2.0,
        feedbackHigh: 'Stand tall — avoid bending at the hip',
        feedbackLow: 'Do not lean backward — keep hips neutral',
      },
      {
        name: 'Right Hip',
        points: [12, 24, 26],
        ideal: 175,
        tolerance: 10,
        weight: 2.0,
        feedbackHigh: 'Stand tall — avoid bending at the hip',
        feedbackLow: 'Do not lean backward — keep hips neutral',
      },
    ],
  },

  trikonasana: {
    id: 'trikonasana',
    name: 'Trikonasana',
    sanskrit: 'त्रिकोणासन',
    english: 'Triangle Pose',
    difficulty: 'Beginner',
    description: 'Open your hips and chest while lengthening the sides of your torso.',
    benefits: ['Stretches hips & thighs', 'Opens chest', 'Improves balance'],
    guidance: [
      'Feet 3-4 feet apart',
      'Right foot out 90Â°, left foot in 15Â°',
      'Extend arms parallel to floor',
      'Reach right hand to shin/ankle',
      'Left arm points to sky',
    ],
    youtubeUrl: 'https://www.youtube.com/embed/NMnmn8Z39Cc?si=4dunrfBSqea94jae',
    color: '#6d28d9',
    joints: [
      {
        name: 'Front Knee',
        points: [24, 26, 28],
        ideal: 175,
        tolerance: 10,
        weight: 2.0,
        feedbackHigh: 'Keep your front leg straight — do not bend the knee',
        feedbackLow: 'Ease up on locking the front knee',
      },
      {
        name: 'Back Knee',
        points: [23, 25, 27],
        ideal: 175,
        tolerance: 10,
        weight: 2.0,
        feedbackHigh: 'Straighten your back leg fully',
        feedbackLow: 'Relax the back leg — do not over-extend',
      },
      {
        name: 'Right Elbow',
        points: [12, 14, 16],
        ideal: 170,
        tolerance: 15,
        weight: 1.0,
        feedbackHigh: 'Keep your upper arm straight — extend to the sky',
        feedbackLow: 'Relax the upper arm',
      },
      {
        name: 'Left Elbow',
        points: [11, 13, 15],
        ideal: 160,
        tolerance: 15,
        weight: 1.0,
        feedbackHigh: 'Straighten the lower arm toward your shin',
        feedbackLow: 'Do not press too hard into the lower arm',
      },
      {
        name: 'Hip Tilt',
        points: [11, 23, 24],
        ideal: 100,
        tolerance: 15,
        weight: 2.5,
        feedbackHigh: 'Tilt from your hip — do not crunch the side',
        feedbackLow: 'Open your hips more — rotate them outward',
      },
    ],
  },

  vrikshasana: {
    id: 'vrikshasana',
    name: 'Vrikshasana',
    sanskrit: 'वृक्षासन',
    english: 'Tree Pose',
    difficulty: 'Beginner',
    description: 'Balance on one leg like a rooted tree — steady mind, steady body.',
    benefits: ['Improves balance', 'Strengthens ankles', 'Calms the mind'],
    guidance: [
      'Stand on left leg firmly',
      'Place right foot on inner thigh',
      'Join palms at chest (Namaste)',
      'Raise arms overhead',
      'Focus gaze on one point',
    ],
    youtubeUrl: 'https://www.youtube.com/embed/wdln9qWYloU',
    color: '#0d9488',
    joints: [
      {
        name: 'Standing Knee',
        points: [23, 25, 27],
        ideal: 175,
        tolerance: 10,
        weight: 2.5,
        feedbackHigh: 'Keep your standing leg straight and strong',
        feedbackLow: 'Micro-bend the standing knee — do not lock it',
      },
      {
        name: 'Hip Alignment',
        points: [11, 23, 25],
        ideal: 178,
        tolerance: 8,
        weight: 2.0,
        feedbackHigh: 'Open your hip — square your hips forward',
        feedbackLow: 'Do not lean — keep hips level',
      },
      {
        name: 'Left Shoulder',
        points: [13, 11, 23],
        ideal: 160,
        tolerance: 20,
        weight: 1.5,
        feedbackHigh: 'Raise your arms higher — palms together overhead',
        feedbackLow: 'Relax the shoulders — do not shrug',
      },
      {
        name: 'Right Shoulder',
        points: [14, 12, 24],
        ideal: 160,
        tolerance: 20,
        weight: 1.5,
        feedbackHigh: 'Raise your arms higher — reach to the sky',
        feedbackLow: 'Relax the shoulders — do not shrug',
      },
    ],
  },

  warrior1: {
    id: 'warrior1',
    name: 'Virabhadrasana I',
    sanskrit: 'वीरभद्रासन १',
    english: 'Warrior I',
    difficulty: 'Intermediate',
    description: 'Channel the spirit of the warrior — strength, focus, and grace.',
    benefits: ['Strengthens legs', 'Opens chest', 'Builds stamina'],
    guidance: [
      'Step right foot forward 4 feet',
      'Back heel at 45Â°',
      'Bend right knee over ankle',
      'Raise arms overhead',
      'Look up between hands',
    ],
    youtubeUrl: 'https://www.youtube.com/embed/kkGY3xBnaGc?si=pDvFRELL4gDIe5Z3',
    color: '#e11d48',
    joints: [
      {
        name: 'Front Knee',
        points: [24, 26, 28],
        ideal: 90,
        tolerance: 15,
        weight: 2.5,
        feedbackHigh: 'Bend your front knee deeper — aim for 90Â°',
        feedbackLow: 'Bend the front knee less — keep it over the ankle',
      },
      {
        name: 'Back Knee',
        points: [23, 25, 27],
        ideal: 170,
        tolerance: 15,
        weight: 2.0,
        feedbackHigh: 'Straighten your back leg — press the heel down',
        feedbackLow: 'Do not over-extend the back leg',
      },
      {
        name: 'Left Arm',
        points: [13, 11, 23],
        ideal: 160,
        tolerance: 20,
        weight: 1.5,
        feedbackHigh: 'Raise your arms high — reach for the sky',
        feedbackLow: 'Relax arms — avoid tensing shoulders',
      },
      {
        name: 'Spine',
        points: [11, 23, 25],
        ideal: 150,
        tolerance: 15,
        weight: 2.0,
        feedbackHigh: 'Open your chest — lift your torso tall',
        feedbackLow: 'Do not lean back excessively',
      },
    ],
  },

  warrior2: {
    id: 'warrior2',
    name: 'Virabhadrasana II',
    sanskrit: 'वीरभद्रासन २',
    english: 'Warrior II',
    difficulty: 'Intermediate',
    description: 'Expand your presence — arms wide, gaze fierce, stance powerful.',
    benefits: ['Strengthens legs & arms', 'Opens hips', 'Improves focus'],
    guidance: [
      'Feet 4-5 feet apart',
      'Right foot out 90Â°, left foot in slightly',
      'Bend right knee over ankle',
      'Arms parallel to floor',
      'Gaze over right fingertips',
    ],
    youtubeUrl: 'https://www.youtube.com/embed/Re-bJURSzFI?si=rbByfKSJlV-7-nl0',
    color: '#d97706',
    joints: [
      {
        name: 'Front Knee',
        points: [24, 26, 28],
        ideal: 90,
        tolerance: 15,
        weight: 2.5,
        feedbackHigh: 'Bend your front knee to 90Â° — align with ankle',
        feedbackLow: 'Straighten the front knee slightly',
      },
      {
        name: 'Back Knee',
        points: [23, 25, 27],
        ideal: 175,
        tolerance: 10,
        weight: 2.0,
        feedbackHigh: 'Keep your back leg straight and strong',
        feedbackLow: 'Ease up on the back leg',
      },
      {
        name: 'Left Elbow',
        points: [11, 13, 15],
        ideal: 170,
        tolerance: 15,
        weight: 1.5,
        feedbackHigh: 'Extend your left arm fully — reach out to the left',
        feedbackLow: 'Relax your elbow',
      },
      {
        name: 'Right Elbow',
        points: [12, 14, 16],
        ideal: 170,
        tolerance: 15,
        weight: 1.5,
        feedbackHigh: 'Extend your right arm fully — reach to the right',
        feedbackLow: 'Relax your elbow',
      },
      {
        name: 'Hip Open',
        points: [11, 23, 24],
        ideal: 155,
        tolerance: 15,
        weight: 2.0,
        feedbackHigh: 'Open your hips wider — rotate outward',
        feedbackLow: 'Bring hips slightly more forward',
      },
    ],
  },

  downwarddog: {
    id: 'downwarddog',
    name: 'Adho Mukha Svanasana',
    sanskrit: 'अधोमुखश्वानासन',
    english: 'Downward Dog',
    difficulty: 'Beginner',
    description: 'Inverted V-shape — a full body stretch and energizing reset.',
    benefits: ['Stretches hamstrings', 'Strengthens arms', 'Calms the brain'],
    guidance: [
      'Start on hands and knees',
      'Push hips up and back',
      'Straighten arms and legs',
      'Press heels toward floor',
      'Head between arms',
    ],
    youtubeUrl: 'https://www.youtube.com/embed/6Ep5VzGqDRU?si=Lim_Fhbj8U3NLpQF',
    color: '#0891b2',
    joints: [
      {
        name: 'Left Arm',
        points: [11, 13, 15],
        ideal: 165,
        tolerance: 15,
        weight: 2.0,
        feedbackHigh: 'Straighten your arms fully — push the floor away',
        feedbackLow: 'Ease the arm extension',
      },
      {
        name: 'Right Arm',
        points: [12, 14, 16],
        ideal: 165,
        tolerance: 15,
        weight: 2.0,
        feedbackHigh: 'Straighten your arms fully — push the floor away',
        feedbackLow: 'Ease the arm extension',
      },
      {
        name: 'Left Knee',
        points: [23, 25, 27],
        ideal: 170,
        tolerance: 15,
        weight: 2.0,
        feedbackHigh: 'Straighten your left leg — press heel down',
        feedbackLow: 'Micro-bend if hamstrings are tight',
      },
      {
        name: 'Right Knee',
        points: [24, 26, 28],
        ideal: 170,
        tolerance: 15,
        weight: 2.0,
        feedbackHigh: 'Straighten your right leg — press heel down',
        feedbackLow: 'Micro-bend if hamstrings are tight',
      },
      {
        name: 'Hip Angle',
        points: [11, 23, 25],
        ideal: 60,
        tolerance: 15,
        weight: 3.0,
        feedbackHigh: 'Push hips higher — create a sharp V shape',
        feedbackLow: 'Lower your hips slightly',
      },
    ],
  },

  bhujangasana: {
    id: 'bhujangasana',
    name: 'Bhujangasana',
    sanskrit: 'भुजङ्गासन',
    english: 'Cobra Pose',
    difficulty: 'Beginner',
    description: 'Rise like a cobra — open the chest and strengthen the spine.',
    benefits: ['Opens chest', 'Strengthens spine', 'Reduces back pain'],
    guidance: [
      'Lie face down',
      'Place palms under shoulders',
      'Press up, straightening arms',
      'Roll shoulders back and down',
      'Keep hips on floor',
    ],
    youtubeUrl: 'https://www.youtube.com/embed/Z6U6PNBUQPY',
    color: '#7c3aed',
    joints: [
      {
        name: 'Left Elbow',
        points: [11, 13, 15],
        ideal: 140,
        tolerance: 20,
        weight: 2.0,
        feedbackHigh: 'Straighten arms more — lift chest higher',
        feedbackLow: 'Keep a slight bend in elbows — protect lower back',
      },
      {
        name: 'Right Elbow',
        points: [12, 14, 16],
        ideal: 140,
        tolerance: 20,
        weight: 2.0,
        feedbackHigh: 'Straighten arms more — lift chest higher',
        feedbackLow: 'Keep a slight bend in elbows',
      },
      {
        name: 'Spine Curve',
        points: [11, 23, 25],
        ideal: 130,
        tolerance: 20,
        weight: 3.0,
        feedbackHigh: 'Arch your back more — lift your chest to the sky',
        feedbackLow: 'Do not over-arch — protect your lower back',
      },
    ],
  },

  balasana: {
    id: 'balasana',
    name: 'Balasana',
    sanskrit: 'बालासन',
    english: "Child's Pose",
    difficulty: 'Beginner',
    description: 'A restful pose of surrender — perfect for rest and reflection.',
    benefits: ['Releases tension', 'Stretches hips', 'Calms the mind'],
    guidance: [
      'Kneel, toes together',
      'Sit back on heels',
      'Fold forward, arms extended',
      'Forehead rests on mat',
      'Breathe deeply',
    ],
    youtubeUrl: 'https://www.youtube.com/embed/2MJGg-dUKh0',
    color: '#059669',
    joints: [
      {
        name: 'Left Knee Fold',
        points: [23, 25, 27],
        ideal: 40,
        tolerance: 20,
        weight: 2.5,
        feedbackHigh: 'Fold deeper — sit your hips toward your heels',
        feedbackLow: 'Ease up if knees or ankles are uncomfortable',
      },
      {
        name: 'Right Knee Fold',
        points: [24, 26, 28],
        ideal: 40,
        tolerance: 20,
        weight: 2.5,
        feedbackHigh: 'Fold deeper — sit your hips toward your heels',
        feedbackLow: 'Ease up if knees or ankles are uncomfortable',
      },
      {
        name: 'Arms Extended',
        points: [11, 13, 15],
        ideal: 170,
        tolerance: 20,
        weight: 1.5,
        feedbackHigh: 'Reach your arms forward — stretch through fingertips',
        feedbackLow: 'Relax the arms — do not strain',
      },
    ],
  },

  utkatasana: {
    id: 'utkatasana',
    name: 'Utkatasana',
    sanskrit: 'उत्कटासन',
    english: 'Chair Pose',
    difficulty: 'Beginner',
    description: 'A powerful pose that strengthens the legs and core while lifting the heart.',
    benefits: ['Strengthens thighs and ankles', 'Tones shoulders', 'Stimulates heart'],
    guidance: [
      'Bend knees as if sitting in a chair',
      'Keep weight in your heels',
      'Raise arms alongside your ears',
      'Keep chest lifted and spine long'
    ],
    youtubeUrl: 'https://www.youtube.com/embed/VbgoEigDkeY',
    color: '#eab308',
    joints: [
      {
        name: 'Left Knee', points: [23, 25, 27], ideal: 100, tolerance: 30, weight: 2.5,
        feedbackHigh: 'Bend knees deeper into the chair', feedbackLow: 'Ease up slightly on the bend'
      },
      {
        name: 'Right Knee', points: [24, 26, 28], ideal: 100, tolerance: 30, weight: 2.5,
        feedbackHigh: 'Bend knees deeper into the chair', feedbackLow: 'Ease up slightly on the bend'
      },
      {
        name: 'Left Hip', points: [11, 23, 25], ideal: 110, tolerance: 25, weight: 2.0,
        feedbackHigh: 'Sit lower and maintain a strong core', feedbackLow: 'Lift your hips slightly'
      },
      {
        name: 'Right Hip', points: [12, 24, 26], ideal: 110, tolerance: 25, weight: 2.0,
        feedbackHigh: 'Sit lower and maintain a strong core', feedbackLow: 'Lift your hips slightly'
      },
      {
        name: 'Shoulders', points: [13, 11, 23], ideal: 160, tolerance: 30, weight: 1.5,
        feedbackHigh: 'Raise your arms higher alongside your ears', feedbackLow: 'Relax arm tension'
      }
    ]
  },

  chaturanga: {
    id: 'chaturanga',
    name: 'Chaturanga Dandasana',
    sanskrit: 'चतुरङ्गदण्डासन',
    english: 'Four-Limbed Staff Pose',
    difficulty: 'Intermediate',
    description: 'A low plank that requires immense core and arm strength.',
    benefits: ['Builds core strength', 'Tones arms', 'Strengthens wrists'],
    guidance: [
      'Start in high plank',
      'Lower down keeping elbows tucked in',
      'Body hovered parallel to the floor',
      'Keep neck neutral and gaze down'
    ],
    youtubeUrl: 'https://www.youtube.com/embed/gQjA_kUeYUE',
    color: '#ef4444',
    joints: [
      {
        name: 'Left Elbow', points: [11, 13, 15], ideal: 90, tolerance: 20, weight: 2.5,
        feedbackHigh: 'Lower down more, bend elbows to 90 degrees', feedbackLow: 'Do not dip too low'
      },
      {
        name: 'Right Elbow', points: [12, 14, 16], ideal: 90, tolerance: 20, weight: 2.5,
        feedbackHigh: 'Lower down more, bend elbows to 90 degrees', feedbackLow: 'Do not dip too low'
      },
      {
        name: 'Spine/Hips', points: [11, 23, 25], ideal: 180, tolerance: 15, weight: 3.0,
        feedbackHigh: 'Lift your hips to align with your spine', feedbackLow: 'Lower your hips, do not arch back'
      },
      {
        name: 'Knees', points: [23, 25, 27], ideal: 180, tolerance: 15, weight: 2.0,
        feedbackHigh: 'Keep your legs straight and strong', feedbackLow: 'Avoid overextending knees'
      }
    ]
  },

  upwarddog: {
    id: 'upwarddog',
    name: 'Urdhva Mukha Svanasana',
    sanskrit: 'ऊर्ध्वमुखश्वानासन',
    english: 'Upward-Facing Dog',
    difficulty: 'Beginner',
    description: 'A chest-opening backbend that stretches the full front body.',
    benefits: ['Improves posture', 'Stretches chest & lungs', 'Firms buttocks'],
    guidance: [
      'Lie face down',
      'Press into hands, straighten arms',
      'Lift torso and thighs off the floor',
      'Roll shoulders back'
    ],
    youtubeUrl: 'https://www.youtube.com/embed/MhE07IihK3Y',
    color: '#14b8a6',
    joints: [
      {
        name: 'Elbows', points: [11, 13, 15], ideal: 175, tolerance: 15, weight: 2.5,
        feedbackHigh: 'Straighten your arms fully', feedbackLow: 'Avoid hyperextending elbows'
      },
      {
        name: 'Spine Arc', points: [0, 11, 23], ideal: 140, tolerance: 25, weight: 2.0,
        feedbackHigh: 'Lift your chest and gaze upwards', feedbackLow: 'Do not over-arch your neck'
      },
      {
        name: 'Hips', points: [11, 23, 25], ideal: 160, tolerance: 20, weight: 2.0,
        feedbackHigh: 'Allow hips to drop slightly for the backbend', feedbackLow: 'Lift thighs off the mat'
      }
    ]
  },

  navasana: {
    id: 'navasana',
    name: 'Navasana',
    sanskrit: 'नावासन',
    english: 'Boat Pose',
    difficulty: 'Intermediate',
    description: 'A core-strengthening V-shape balance on the sitting bones.',
    benefits: ['Tones abdominals', 'Strengthens spine', 'Improves digestion'],
    guidance: [
      'Balance on your sitting bones',
      'Keep legs straight or knees bent',
      'Lean torso back slightly',
      'Extend arms forward parallel to ground'
    ],
    youtubeUrl: 'https://www.youtube.com/embed/FwAEn11Oiyw',
    color: '#3b82f6',
    joints: [
      {
        name: 'Hip Angle (V-Shape)', points: [11, 23, 25], ideal: 90, tolerance: 20, weight: 3.0,
        feedbackHigh: 'Lean back and lift legs to create a V-shape', feedbackLow: 'Close the gap slightly'
      },
      {
        name: 'Knees', points: [23, 25, 27], ideal: 175, tolerance: 20, weight: 2.0,
        feedbackHigh: 'Straighten your legs if possible', feedbackLow: 'Slightly bend knees if hamstrings are tight'
      },
      {
        name: 'Arms', points: [13, 11, 23], ideal: 90, tolerance: 25, weight: 1.5,
        feedbackHigh: 'Reach arms straight forward', feedbackLow: 'Relax shoulders'
      }
    ]
  },

  paschimottanasana: {
    id: 'paschimottanasana',
    name: 'Paschimottanasana',
    sanskrit: 'पश्चिमोत्तानासन',
    english: 'Seated Forward Bend',
    difficulty: 'Beginner',
    description: 'A deeply calming forward fold that stretches the entire back body.',
    benefits: ['Stretches hamstrings and spine', 'Calms the mind', 'Relieves stress'],
    guidance: [
      'Sit with legs extended forward',
      'Inhale and lengthen spine',
      'Exhale and fold forward over legs',
      'Reach for toes or ankles'
    ],
    youtubeUrl: 'https://www.youtube.com/embed/T8sGVKpwFOw',
    color: '#8b5cf6',
    joints: [
      {
        name: 'Hip Fold', points: [11, 23, 25], ideal: 30, tolerance: 25, weight: 3.0,
        feedbackHigh: 'Fold deeper from the hips', feedbackLow: 'Ease up if straining the lower back'
      },
      {
        name: 'Knees', points: [23, 25, 27], ideal: 175, tolerance: 15, weight: 2.0,
        feedbackHigh: 'Keep your legs straight against the floor', feedbackLow: 'Micro-bend knees if hamstrings hurt'
      },
      {
        name: 'Arms Reaching', points: [11, 13, 15], ideal: 170, tolerance: 20, weight: 1.5,
        feedbackHigh: 'Reach forward to grasp your feet', feedbackLow: 'Relax your grip'
      }
    ]
  },

  setubandhasana: {
    id: 'setubandhasana',
    name: 'Setu Bandhasana',
    sanskrit: 'सेतुबन्धसर्वाङ्गासन',
    english: 'Bridge Pose',
    difficulty: 'Beginner',
    description: 'A gentle inversion and backbend that opens the chest and hip flexors.',
    benefits: ['Stretches chest and neck', 'Calms the brain', 'Stimulates thyroid'],
    guidance: [
      'Lie on your back, knees bent',
      'Feet flat on the floor close to hips',
      'Press into feet and lift hips high',
      'Roll shoulders under'
    ],
    youtubeUrl: 'https://www.youtube.com/embed/wzXGubtI0pY',
    color: '#ec4899',
    joints: [
      {
        name: 'Knees', points: [24, 26, 28], ideal: 90, tolerance: 20, weight: 2.0,
        feedbackHigh: 'Walk heels closer to your body', feedbackLow: 'Move feet slightly forward'
      },
      {
        name: 'Hip Extension', points: [11, 23, 25], ideal: 170, tolerance: 20, weight: 3.0,
        feedbackHigh: 'Press into your feet and lift hips higher', feedbackLow: 'Do not overextend your lower back'
      }
    ]
  },

  anjaneyasana: {
    id: 'anjaneyasana',
    name: 'Anjaneyasana',
    sanskrit: 'अञ्जनेयासन',
    english: 'Crescent Lunge',
    difficulty: 'Beginner',
    description: 'A deep lunge that stretches the hip flexors and opens the chest.',
    benefits: ['Opens hips', 'Stretches quadriceps', 'Builds balance'],
    guidance: [
      'Drop back knee to the floor',
      'Front knee bent at 90 degrees',
      'Sweep arms overhead',
      'Lift your chest to the sky'
    ],
    youtubeUrl: 'https://www.youtube.com/embed/N-0QJkEIToI',
    color: '#06b6d4',
    joints: [
      {
        name: 'Front Knee', points: [24, 26, 28], ideal: 90, tolerance: 20, weight: 2.5,
        feedbackHigh: 'Bend front knee deeper', feedbackLow: 'Keep knee safely above the ankle'
      },
      {
        name: 'Back Hip Extension', points: [11, 23, 25], ideal: 160, tolerance: 20, weight: 2.0,
        feedbackHigh: 'Sink hips lower and stretch the back quad', feedbackLow: 'Ease up the stretch'
      },
      {
        name: 'Arms Up', points: [13, 11, 23], ideal: 170, tolerance: 20, weight: 1.5,
        feedbackHigh: 'Reach your arms straight up', feedbackLow: 'Relax the shoulders'
      }
    ]
  },

  malasana: {
    id: 'malasana',
    name: 'Malasana',
    sanskrit: 'मालासन',
    english: 'Garland Pose',
    difficulty: 'Beginner',
    description: 'A deep squat that opens the hips and helps with digestion.',
    benefits: ['Opens hips and groin', 'Stretches ankles', 'Improves digestion'],
    guidance: [
      'Squat with feet mat-width apart',
      'Turn toes out slightly',
      'Bring palms to heart center',
      'Use elbows to press knees open'
    ],
    youtubeUrl: 'https://www.youtube.com/embed/5yH1z2kKpt0',
    color: '#10b981',
    joints: [
      {
        name: 'Knee Flexion', points: [23, 25, 27], ideal: 40, tolerance: 25, weight: 3.0,
        feedbackHigh: 'Sink your hips deeper into the squat', feedbackLow: 'Raise your hips if knees ache'
      },
      {
        name: 'Hip Flexion', points: [11, 23, 25], ideal: 50, tolerance: 25, weight: 2.0,
        feedbackHigh: 'Lean forward slightly and squat lower', feedbackLow: 'Lift your chest up more'
      }
    ]
  },

  ardhamatsyendrasana: {
    id: 'ardhamatsyendrasana',
    name: 'Ardha Matsyendrasana',
    sanskrit: 'अर्धमत्स्येन्द्रासन',
    english: 'Half Lord of the Fishes',
    difficulty: 'Intermediate',
    description: 'A seated spinal twist that energizes the spine and stimulates digestion.',
    benefits: ['Stimulates liver and kidneys', 'Stretches shoulders and neck', 'Energizes the spine'],
    guidance: [
      'Sit comfortably on the floor',
      'Bend one knee and cross the other foot over it',
      'Twist torso toward the crossed leg',
      'Hook opposite elbow outside the knee'
    ],
    youtubeUrl: 'https://www.youtube.com/embed/iZWz0P1i6E0',
    color: '#6366f1',
    joints: [
      {
        name: 'Knee Flexion', points: [24, 26, 28], ideal: 50, tolerance: 30, weight: 2.0,
        feedbackHigh: 'Bend knee to bring foot closer to body', feedbackLow: 'Relax the leg'
      },
      {
        name: 'Spinal Alignment', points: [0, 11, 23], ideal: 170, tolerance: 20, weight: 2.0,
        feedbackHigh: 'Sit up straight before twisting', feedbackLow: 'Do not lean back'
      }
    ]
  },

  utthitaparsvakonasana: {
    id: 'utthitaparsvakonasana',
    name: 'Utthita Parsvakonasana',
    sanskrit: 'उत्थितपार्श्वकोणासन',
    english: 'Extended Side Angle',
    difficulty: 'Intermediate',
    description: 'A standing pose that creates a long line of energy from heel to fingertips.',
    benefits: ['Strengthens legs', 'Stretches groins and spine', 'Improves stamina'],
    guidance: [
      'Wide stance, turn front foot out',
      'Bend front knee to 90 degrees',
      'Rest forearm on thigh or hand to floor',
      'Extend top arm over ear'
    ],
    youtubeUrl: 'https://www.youtube.com/embed/R1x1LpYwQEY',
    color: '#f43f5e',
    joints: [
      {
        name: 'Front Knee', points: [24, 26, 28], ideal: 90, tolerance: 20, weight: 2.5,
        feedbackHigh: 'Bend your front knee to 90 degrees', feedbackLow: 'Keep knee over ankle'
      },
      {
        name: 'Back Leg', points: [23, 25, 27], ideal: 175, tolerance: 15, weight: 2.0,
        feedbackHigh: 'Keep the back leg straight and strong', feedbackLow: 'Micro-bend if needed'
      },
      {
        name: 'Extended Arm', points: [13, 11, 23], ideal: 160, tolerance: 25, weight: 1.5,
        feedbackHigh: 'Extend top arm straight over your ear', feedbackLow: 'Relax shoulder away from ear'
      }
    ]
  }

};

export const POSE_LIST = Object.values(POSES);
