/* ==========================================================================
   LESSONS DATABASE & FRAMEWORK - 3D BIKE & SCOOTER SIMULATOR
   ========================================================================== */

const LessonsDatabase = [
    {
        id: 1,
        level: 1,
        titleBN: "পাঠ ১: বাইক ও স্কুটারের প্রাথমিক পরিচিতি",
        titleEN: "Lesson 1: Introduction to Motorcycles and Scooters",
        objectiveBN: "বাইক ও স্কুটারের মূল পার্থক্য এবং এর বাহ্যিক প্রধান অংশগুলো চেনা।",
        explanationBN: "মোটরসাইকেল এবং স্কুটার উভয়ই দুই চাকার যান হলেও এদের ড্রাইভিং মেকানিজম আলাদা। মোটরসাইকেলে ম্যানুয়াল ক্লাচ ও গিয়ার থাকে, যেখানে স্কুটারে সাধারণত অটোমেটিক সিভিটি (CVT) ট্রান্সমিশন ব্যবহার করা হয়।",
        terms: [
            { bn: "মোটরসাইকেল", en: "Motorcycle" },
            { bn: "স্কুটার", en: "Scooter" },
            { bn: "ট্রান্সমিশন", en: "Transmission" }
        ],
        importanceBN: "গাড়ি চালানোর আগে এর গঠন এবং বিভিন্ন যন্ত্রাংশের কাজ সম্পর্কে পরিষ্কার ধারণা থাকা জরুরি, যা দুর্ঘটনা এড়াতে সাহায্য করে।"
    },
    {
        id: 2,
        level: 1,
        titleBN: "পাঠ ২: হ্যান্ডেল ও স্টিয়ারিং কন্ট্রোল",
        titleEN: "Lesson 2: Handlebar & Steering Control",
        objectiveBN: "হ্যান্ডেলবারের কাজ এবং হাত ও কবজির সঠিক পজিশন শেখা।",
        explanationBN: "হ্যান্ডেলবার হলো গাড়ির দিক পরিবর্তন বা টার্ন নেওয়ার মূল মাধ্যম। এর দুই প্রান্তে এক্সিলারেটর, ব্রেক লিভার এবং বিভিন্ন সুইচ থাকে।",
        terms: [
            { bn: "হ্যান্ডেলবার", en: "Handlebar" },
            { bn: "স্টিয়ারিং", en: "Steering" }
        ],
        importanceBN: "ভারসাম্য বজায় রাখতে এবং সঠিক দিকে গাড়ি নিতে হ্যান্ডেলের ওপর সঠিক নিয়ন্ত্রণ থাকা আবশ্যক।"
    },
    {
        id: 3,
        level: 2,
        titleBN: "পাঠ ৩: ইগনিশন চাবি ও ইলেকট্রিক সিস্টেম",
        titleEN: "Lesson 3: Ignition Key & Electrical System",
        objectiveBN: "চাবি অন করা এবং ড্যাশবোর্ড লাইট বা ইন্ডিকেটর চেক করা।",
        explanationBN: "ইগনিশন লক বা চাবি ইনসার্ট করে অন করলে গাড়ির ব্যাটারি থেকে ড্যাশবোর্ডে বিদ্যুৎ সরবরাহ শুরু হয়। এর ফলে স্পিডোমিটার এবং ফুয়েল গেজ সক্রিয় হয়।",
        terms: [
            { bn: "ইগনিশন চাবি", en: "Ignition Key" },
            { bn: "ড্যাশবোর্ড", en: "Dashboard" }
        ],
        importanceBN: "ইঞ্জিন স্টার্ট করার আগে ইলেকট্রিক কানেকশন এবং ফুয়েল লেভেল সঠিকভাবে যাচাই করা নিরাপত্তার প্রথম শর্ত।"
    },
    {
        id: 4,
        level: 3,
        titleBN: "পাঠ ৪: সেলফ স্টার্ট ও কিক স্টার্ট",
        titleEN: "Lesson 4: Self-Start and Kick Starter",
        objectiveBN: "ইঞ্জিন চালু করার বিভিন্ন পদ্ধতি শেখা।",
        explanationBN: "আধুনিক বাইক ও স্কুটারে ইলেকট্রিক সেলফ-স্টার্ট বাটন থাকে। তবে ব্যাটারি ডাউন থাকলে বা পুরোনো মডেলে কিক স্টার্ট ব্যবহার করে ম্যানুয়ালি ইঞ্জিন চালু করতে হয়।",
        terms: [
            { bn: "সেলফ স্টার্ট বাটন", en: "Self-Start Button" },
            { bn: "কিক স্টার্ট", en: "Kick Starter" }
        ],
        importanceBN: "ঠান্ডা আবহাওয়ায় বা ব্যাটারি সমস্যার সময় সঠিক উপায়ে ইঞ্জিন স্টার্ট করতে না জানলে গাড়ি চালানো অসম্ভব হয়ে পড়ে।"
    },
    {
        id: 5,
        level: 4,
        titleBN: "পাঠ ৫: অ্যাক্সিলারেটর ও থ্রটল কন্ট্রোল",
        titleEN: "Lesson 5: Throttle & Speed Control",
        objectiveBN: "ডান হাতের মুঠো ঘুরিয়ে ইঞ্জিনের গতি নিয়ন্ত্রণ করা শেখা।",
        explanationBN: "ডান হাতের গ্রিপ বা থ্রটল নিজের দিকে ঘোরালে কার্বুরেটর বা ফুয়েল ইনজেকশনে বেশি জ্বালানি সরবরাহ হয়, ফলে ইঞ্জিনের গতি বৃদ্ধি পায়।",
        terms: [
            { bn: "অ্যাক্সিলারেটর", en: "Accelerator" },
            { bn: "থ্রটল", en: "Throttle" }
        ],
        importanceBN: "গতি বাড়ানোর এবং কমানোর সময় থ্রটলের ওপর মৃদু ও সুষম হাত না রাখলে গাড়ি আচমকা নিয়ন্ত্রণ হারাতে পারে।"
    }
];

// Lesson Navigation & UI Logic
let currentLessonIndex = 0;

function getCurrentLesson() {
    return LessonsDatabase[currentLessonIndex];
}

function loadLessonContent(lessonId) {
    const lesson = LessonsDatabase.find(l => l.id === lessonId);
    if (!lesson) return;

    const titleEl = document.getElementById('instructor-step-title');
    const speechEl = document.getElementById('instructor-speech');

    if (titleEl) titleEl.innerText = lesson.titleBN;
    if (speechEl) speechEl.innerText = lesson.explanationBN;
}

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LessonsDatabase, getCurrentLesson, loadLessonContent };
}
