import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const ResumeBuilder = () => {
    const [personalInfo, setPersonalInfo] = useState({
        fullName: "Alexander Thompson",
        email: "alex.t@university.edu",
        phone: "+1 (555) 0123",
        linkedin: "linkedin.com/in/alex-t",
        summary: "Motivated Senior Computer Science student with a focus on AI and Machine Learning. Proven track record of academic excellence and hands-on project experience in Python development."
    });

    const [education, setEducation] = useState([
        {
            id: 1,
            university: "Stanford University",
            degree: "B.S. in Computer Science",
            year: "2020 - 2024",
            gpa: "3.92",
            details: [
                "Relevant Coursework: Advanced Algorithms, Neural Networks, Database Systems.",
                "Dean's List: 2021, 2022, 2023."
            ]
        }
    ]);

    const [skills, setSkills] = useState(["Python", "TensorFlow", "React.js", "SQL"]);
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: "Zertainity AI Dashboard",
            time: "Fall 2023",
            description: "Built a real-time analytics engine for student performance tracking using React and D3.js."
        }
    ]);

    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-primary dark:text-white transition-colors duration-200 h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center justify-between border-b border-solid border-[#e5e5e5] dark:border-[#333] bg-white dark:bg-background-dark px-8 z-10">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center bg-primary text-white p-1.5 rounded">
                        <span className="material-symbols-outlined text-xl">description</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-sm font-bold leading-tight tracking-tight uppercase">Zertainity AI</h1>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Career Platform</p>
                    </div>
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
                    <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Student Resume Builder</h2>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-primary dark:text-gray-400 transition-colors">
                        <span className="material-symbols-outlined text-lg">save</span>
                        Auto-saved
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex min-w-[120px] items-center justify-center gap-2 rounded bg-primary px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-base">download</span>
                        Download PDF
                    </button>
                    <div className="h-8 w-8 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdsu_BMAgBaTUn06345Zy4JqHoUBwPsdO7pFzX_DnOYKSdrtz7xLy0Jr52w6FSqRdkf-skbYngsKBk7HwAMcUSfDWPIHF4-3JPNIC8ADhGCRIqBKNyo1sWvGynaZM4jkaCdj9VxT_-5Jv_Io7fk2GtyRLIdY9Fd4q0G_bjhmvCmABx1XRVlUhsN3VkqrF8iwf_dZiIdSLLXnBZ2A0rUeAvWYqIBVoU_uj6vLio_Wk0BF8_FrqeNEVTYd2G7X-Y6RtkLNJy6pPRKQ")' }}></div>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex flex-1 overflow-hidden">
                {/* Left Side: Edit Panel */}
                <aside className="w-[450px] flex flex-col border-r border-[#e5e5e5] dark:border-[#333] bg-white dark:bg-background-dark overflow-y-auto">
                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="text-lg font-bold">Edit Resume</h3>
                            <p className="text-xs text-gray-500">Fill in the sections below to build your academic profile.</p>
                        </div>

                        {/* Collapsible: Personal Info */}
                        <details className="group border-b border-gray-100 dark:border-gray-800 pb-4" open>
                            <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-lg">person</span>
                                    Personal Information
                                </div>
                                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="mt-4 grid grid-cols-1 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-gray-400">Full Name</label>
                                    <input
                                        className="w-full border-gray-200 bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-0 dark:border-gray-700 dark:bg-gray-800 rounded"
                                        type="text"
                                        value={personalInfo.fullName}
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-gray-400">Email</label>
                                        <input
                                            className="w-full border-gray-200 bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-0 dark:border-gray-700 dark:bg-gray-800 rounded"
                                            type="email"
                                            value={personalInfo.email}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-gray-400">Phone</label>
                                        <input
                                            className="w-full border-gray-200 bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-0 dark:border-gray-700 dark:bg-gray-800 rounded"
                                            type="text"
                                            value={personalInfo.phone}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-gray-400">Professional Summary</label>
                                    <textarea
                                        className="w-full border-gray-200 bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-0 dark:border-gray-700 dark:bg-gray-800 rounded"
                                        rows={3}
                                        value={personalInfo.summary}
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                        </details>

                        {/* Collapsible: Education */}
                        <details className="group border-b border-gray-100 dark:border-gray-800 pb-4">
                            <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-lg">school</span>
                                    Education
                                </div>
                                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="mt-4 space-y-4">
                                {education.map((edu, index) => (
                                    <div key={edu.id} className="p-3 border border-dashed border-gray-300 rounded bg-gray-50 dark:bg-gray-800/50">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-bold uppercase text-gray-400">Entry #{index + 1}</span>
                                            <span className="material-symbols-outlined text-sm text-red-500 cursor-pointer">delete</span>
                                        </div>
                                        <div className="space-y-3">
                                            <input
                                                className="w-full border-none bg-transparent p-0 text-sm font-semibold focus:ring-0"
                                                placeholder="University Name"
                                                type="text"
                                                value={edu.university}
                                                onChange={(e) => {
                                                    const newEdu = [...education];
                                                    newEdu[index].university = e.target.value;
                                                    setEducation(newEdu);
                                                }}
                                            />
                                            <input
                                                className="w-full border-none bg-transparent p-0 text-xs focus:ring-0"
                                                placeholder="Degree"
                                                type="text"
                                                value={edu.degree}
                                                onChange={(e) => {
                                                    const newEdu = [...education];
                                                    newEdu[index].degree = e.target.value;
                                                    setEducation(newEdu);
                                                }}
                                            />
                                            <div className="flex gap-2">
                                                <input
                                                    className="w-1/2 border-none bg-transparent p-0 text-[11px] text-gray-500 focus:ring-0"
                                                    type="text"
                                                    value={edu.year}
                                                    onChange={(e) => {
                                                        const newEdu = [...education];
                                                        newEdu[index].year = e.target.value;
                                                        setEducation(newEdu);
                                                    }}
                                                />
                                                <input
                                                    className="w-1/2 border-none bg-transparent p-0 text-[11px] text-gray-500 focus:ring-0"
                                                    type="text"
                                                    value={edu.gpa}
                                                    onChange={(e) => {
                                                        const newEdu = [...education];
                                                        newEdu[index].gpa = e.target.value;
                                                        setEducation(newEdu);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-2 border border-dashed border-gray-300 rounded text-[11px] font-bold uppercase text-gray-500 hover:bg-gray-50 transition-colors">+ Add Education</button>
                            </div>
                        </details>

                        {/* Collapsible: Skills */}
                        <details className="group border-b border-gray-100 dark:border-gray-800 pb-4">
                            <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-lg">star</span>
                                    Skills
                                </div>
                                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="mt-4 space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-primary text-white text-[10px] rounded-full flex items-center gap-1">
                                            {skill}
                                            <span
                                                className="material-symbols-outlined text-[12px] cursor-pointer"
                                                onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                                            >close</span>
                                        </span>
                                    ))}
                                </div>
                                <input
                                    className="w-full border-gray-200 bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-0 dark:border-gray-700 dark:bg-gray-800 rounded"
                                    placeholder="Add a skill (e.g. AWS, Figma) and press Enter"
                                    type="text"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setSkills([...skills, e.currentTarget.value]);
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                            </div>
                        </details>

                        {/* Collapsible: Projects */}
                        <details className="group border-b border-gray-100 dark:border-gray-800 pb-4">
                            <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-lg">code</span>
                                    Projects
                                </div>
                                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="mt-4 space-y-4">
                                {projects.map((proj, index) => (
                                    <div key={proj.id} className="p-3 border border-gray-200 rounded">
                                        <div className="flex justify-between mb-2">
                                            <input
                                                className="font-bold text-sm bg-transparent border-none p-0 focus:ring-0 w-full"
                                                type="text"
                                                value={proj.title}
                                                onChange={(e) => {
                                                    const newProj = [...projects];
                                                    newProj[index].title = e.target.value;
                                                    setProjects(newProj);
                                                }}
                                            />
                                            <span className="material-symbols-outlined text-sm text-gray-400 cursor-pointer">drag_indicator</span>
                                        </div>
                                        <textarea
                                            className="w-full border-none bg-transparent p-0 text-xs text-gray-600 focus:ring-0 resize-none"
                                            value={proj.description}
                                            onChange={(e) => {
                                                const newProj = [...projects];
                                                newProj[index].description = e.target.value;
                                                setProjects(newProj);
                                            }}
                                        ></textarea>
                                    </div>
                                ))}
                                <button className="w-full py-2 border border-dashed border-gray-300 rounded text-[11px] font-bold uppercase text-gray-500 hover:bg-gray-50 transition-colors">+ Add Project</button>
                            </div>
                        </details>
                    </div>
                </aside>

                {/* Right Side: Real-time Preview */}
                <section className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-12">
                    <div className="mx-auto flex flex-col items-center">
                        {/* Zoom Controls */}
                        <div className="mb-6 flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                            <button className="p-1 hover:bg-gray-100 rounded transition-colors"><span className="material-symbols-outlined text-lg">zoom_out</span></button>
                            <span className="px-2 text-xs font-medium flex items-center">100%</span>
                            <button className="p-1 hover:bg-gray-100 rounded transition-colors"><span className="material-symbols-outlined text-lg">zoom_in</span></button>
                            <div className="w-[1px] bg-gray-200 mx-1"></div>
                            <button onClick={handlePrint} className="p-1 hover:bg-gray-100 rounded transition-colors"><span className="material-symbols-outlined text-lg">print</span></button>
                        </div>

                        {/* Paper Preview */}
                        <div ref={componentRef} className="resume-preview-container w-[794px] bg-white text-[#2a2a2a] p-[60px] flex flex-col relative shadow-xl">
                            {/* Preview Header */}
                            <header className="text-center mb-8">
                                <h2 className="text-3xl font-bold tracking-tight text-primary">{personalInfo.fullName}</h2>
                                <div className="mt-2 flex justify-center gap-4 text-[11px] font-medium text-gray-500">
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">mail</span> {personalInfo.email}</span>
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">phone</span> {personalInfo.phone}</span>
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">public</span> {personalInfo.linkedin}</span>
                                </div>
                            </header>

                            {/* Summary */}
                            <section className="mb-6">
                                <h3 className="text-xs font-bold uppercase tracking-[2px] border-b-2 border-primary pb-1 mb-3">Profile</h3>
                                <p className="text-xs leading-relaxed text-gray-700">
                                    {personalInfo.summary}
                                </p>
                            </section>

                            {/* Education */}
                            <section className="mb-6">
                                <h3 className="text-xs font-bold uppercase tracking-[2px] border-b-2 border-primary pb-1 mb-3">Education</h3>
                                {education.map((edu, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="text-sm font-bold">{edu.university}</h4>
                                            <span className="text-[10px] text-gray-500 italic">{edu.year}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline mt-1">
                                            <p className="text-xs text-gray-700 italic">{edu.degree}</p>
                                            <span className="text-[10px] font-bold">GPA: {edu.gpa}</span>
                                        </div>
                                        <ul className="mt-2 text-xs text-gray-600 list-disc ml-4 space-y-1">
                                            {edu.details.map((detail, idx) => (
                                                <li key={idx}>{detail}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </section>

                            {/* Projects */}
                            <section className="mb-6">
                                <h3 className="text-xs font-bold uppercase tracking-[2px] border-b-2 border-primary pb-1 mb-3">Academic Projects</h3>
                                <div className="space-y-4">
                                    {projects.map((proj, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-baseline">
                                                <h4 className="text-sm font-bold">{proj.title}</h4>
                                                <span className="text-[10px] text-gray-500 italic">{proj.time}</span>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-700 leading-relaxed">
                                                {proj.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Skills */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-[2px] border-b-2 border-primary pb-1 mb-3">Technical Skills</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex gap-2 text-xs">
                                        <span className="font-bold min-w-[100px]">Skills:</span>
                                        <span className="text-gray-700">{skills.join(", ")}</span>
                                    </div>
                                </div>
                            </section>

                            {/* Subtle Footer/Watermark */}
                            <div className="absolute bottom-8 right-12 opacity-10 flex items-center gap-1">
                                <span className="text-[8px] font-bold uppercase tracking-widest">Built with Zertainity AI</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ResumeBuilder;
