import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProjectPortfolio = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All Work');

    const projects = [
        {
            title: "Predictive Sales Model",
            description: "Developed a high-accuracy time-series forecasting engine to predict quarterly retail performance across 500+ locations using ensemble learning.",
            tags: ["Python", "Scikit-learn"],
            icon: "analytics",
            category: "Machine Learning"
        },
        {
            title: "Sentiment Analysis Pipeline",
            description: "An end-to-end NLP pipeline designed to classify customer feedback sentiments in real-time using fine-tuned BERT architecture.",
            tags: ["PyTorch", "Transformers"],
            icon: "chat_bubble",
            category: "NLP"
        },
        {
            title: "Supply Chain Optimizer",
            description: "Architected a data warehouse solution and interactive dashboard to identify logistics bottlenecks, resulting in a 15% efficiency increase.",
            tags: ["SQL", "Tableau"],
            icon: "database",
            category: "Data Viz"
        },
        {
            title: "Anomaly Detection System",
            description: "Utilized Deep Learning autoencoders to detect fraudulent financial transactions with a 99.2% precision rate.",
            tags: ["Keras", "NetworkX"],
            icon: "lock",
            category: "Machine Learning"
        },
        {
            title: "Visual Recognition API",
            description: "Developed a scalable API for automated quality control in manufacturing using convolutional neural networks.",
            tags: ["OpenCV", "TensorFlow"],
            icon: "image",
            category: "Computer Vision"
        },
        {
            title: "User Growth Analytics",
            description: "A comprehensive study on user retention and churn rates for a SaaS startup using cohort analysis techniques.",
            tags: ["Pandas", "Matplotlib"],
            icon: "auto_graph",
            category: "Data Viz"
        }
    ];

    const filteredProjects = filter === 'All Work'
        ? projects
        : projects.filter(p => p.category === filter || (filter === 'Machine Learning' && p.category === 'Computer Vision')); // Grouping CV under ML or strictly? The HTML has "Machine Learning", "NLP", "Data Viz". Let's stick to strict or just mock it. The provided HTML filter buttons are "All Work", "Machine Learning", "NLP", "Data Viz".

    return (
        <div className="bg-background-light dark:bg-background-dark text-primary dark:text-white font-display min-h-screen flex flex-col antialiased">
            <header className="w-full border-b border-border-light dark:border-border-dark bg-white dark:bg-background-dark sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <span className="text-xl font-bold tracking-tighter uppercase italic cursor-pointer" onClick={() => navigate('/')}>Zertainity</span>
                        <nav className="hidden md:flex items-center gap-6">
                            <Link className="text-sm font-medium border-b-2 border-black dark:border-white pb-1" to="/portfolio">Portfolio</Link>
                            <Link className="text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors" to="/education-level">Assessments</Link>
                            <Link className="text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors" to="/mentorship">Mentors</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Add New Project
                        </button>
                    </div>
                </div>
            </header>

            <section className="w-full border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                <div className="max-w-7xl mx-auto px-8 py-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight mb-2">Student Project Portfolio</h1>
                            <p className="text-neutral-500 max-w-xl">A curated showcase of technical implementations, data models, and strategic AI solutions developed at Zertainity.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['All Work', 'Machine Learning', 'NLP', 'Data Viz'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 text-xs font-bold border uppercase tracking-widest transition-colors ${filter === f
                                            ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                                            : "border-border-light dark:border-border-dark hover:border-black dark:hover:border-white"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-8 py-16 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredProjects.map((project, index) => (
                        <article key={index} className="group flex flex-col">
                            <div className="aspect-video bg-neutral-200 dark:bg-neutral-800 mb-6 relative overflow-hidden grayscale-filter group-hover:grayscale-0 transition-all duration-500">
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <span className="material-symbols-outlined text-6xl">{project.icon}</span>
                                </div>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <div className="flex gap-2 mb-3">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest py-1 px-2 bg-neutral-100 dark:bg-neutral-800">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:underline decoration-2 underline-offset-4 transition-all">{project.title}</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {project.description}
                                </p>
                                <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                                    View Case Study
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            <footer className="w-full border-t border-border-light dark:border-border-dark py-12 mt-20">
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-50">© 2024 Zertainity Platform</span>
                    <div className="flex gap-8">
                        <a className="text-xs font-bold uppercase tracking-widest hover:underline transition-all" href="#">Documentation</a>
                        <a className="text-xs font-bold uppercase tracking-widest hover:underline transition-all" href="#">Privacy</a>
                        <a className="text-xs font-bold uppercase tracking-widest hover:underline transition-all" href="#">Support</a>
                    </div>
                </div>
            </footer>
            <style>{`
                .grayscale-filter {
                    filter: grayscale(100%);
                }
                .group:hover .grayscale-filter {
                    filter: grayscale(0%);
                }
            `}</style>
        </div>
    );
};

export default ProjectPortfolio;
