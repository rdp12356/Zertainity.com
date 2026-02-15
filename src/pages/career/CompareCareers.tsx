import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompareCareers = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-black dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden antialiased transition-colors duration-200">
            <header className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md">
                <div className="px-4 md:px-10 py-4 flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-black dark:text-white">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
                                <path clipRule="evenodd" d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-black dark:text-white text-xl font-bold tracking-tight">Zertainity</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">help</span>
                            Help
                        </button>
                        <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 mx-2 hidden sm:block"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-black dark:text-white">Alex Morgan</p>
                                <p className="text-xs text-gray-500">Student</p>
                            </div>
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-gray-100 dark:ring-gray-800" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_gssfe9ABfjmV9VIGvCcjKwssqq72uBGD0Ay9YA8xJk3BY5FIRq8SWQPCesevQNHDSMWrP1ExjyR-0xvIimEesmKnO_X55-Up7P-RDlVZj8HF0Qoe9O8a3cI4QUNjZF5oIp0AdHkaRriKbzj7if5XzpqlvzlgKStaSUI19CTCmmCXrmhjtZxwoixB2azHIGUcTh7zHUFwcfN3VxVpVcjtVXWevm8sxY1sH1RLfb1w-hdO-H7F5PhZQcPfAztrtmxMruGxGNMYAQ")' }}></div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1 flex flex-col p-6 sm:px-10 sm:py-12 w-full max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-4">
                            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
                                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                Back to Assessment
                            </button>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-black dark:text-white">
                            Compare Career Paths
                        </h1>
                        <p className="text-gray-500 max-w-xl font-light">
                            Analyze key metrics side-by-side to make an informed decision about your future.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 hover:border-gray-400 hover:text-black dark:hover:text-white transition-all bg-white dark:bg-surface-dark">
                            <span className="material-symbols-outlined text-[20px]">print</span>
                            Print
                        </button>
                        <button className="flex items-center gap-2 h-10 px-5 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Add Career
                        </button>
                    </div>
                </div>
                <div className="w-full overflow-x-auto pb-6">
                    <div className="min-w-[800px] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-surface-dark">
                        <div className="grid grid-cols-4 bg-gray-50 dark:bg-black/20 border-b border-gray-200 dark:border-gray-800">
                            <div className="p-6 flex items-center text-gray-400 text-sm font-medium uppercase tracking-wider">
                                Criteria
                            </div>
                            {['UX Designer', 'Product Manager', 'Frontend Developer'].map((career, index) => (
                                <div key={index} className="p-6 relative group border-l border-gray-100 dark:border-gray-800">
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-gray-400 hover:text-red-500">
                                        <span className="material-symbols-outlined text-[20px]">close</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Career {index + 1}</span>
                                        <h3 className="text-lg font-bold text-black dark:text-white">{career}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                            <div className="p-6 flex items-center font-semibold text-gray-700 dark:text-gray-300">
                                Match Score
                            </div>
                            {[
                                { score: 92, label: 'Excellent Fit', color: 'text-black dark:text-white' },
                                { score: 78, label: 'Good Fit', color: 'text-gray-600 dark:text-gray-400' },
                                { score: 85, label: 'Great Fit', color: 'text-black dark:text-white' }
                            ].map((item, index) => (
                                <div key={index} className="p-6 border-l border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-2">
                                        <div className={`radial-progress ${item.color} font-bold text-sm`} style={{ "--value": item.score, "--size": "2.5rem" } as React.CSSProperties}>{item.score}%</div>
                                        <span className="text-sm text-gray-500">{item.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                            <div className="p-6 flex items-center font-semibold text-gray-700 dark:text-gray-300">
                                Average Salary
                            </div>
                            <div className="p-6 border-l border-gray-100 dark:border-gray-800">
                                <p className="text-base font-medium text-black dark:text-white">$85,000 - $130,000</p>
                                <p className="text-xs text-gray-400 mt-1">Per year</p>
                            </div>
                            <div className="p-6 border-l border-gray-100 dark:border-gray-800">
                                <p className="text-base font-medium text-black dark:text-white">$95,000 - $150,000</p>
                                <p className="text-xs text-gray-400 mt-1">Per year</p>
                            </div>
                            <div className="p-6 border-l border-gray-100 dark:border-gray-800">
                                <p className="text-base font-medium text-black dark:text-white">$80,000 - $140,000</p>
                                <p className="text-xs text-gray-400 mt-1">Per year</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                            <div className="p-6 flex items-center font-semibold text-gray-700 dark:text-gray-300">
                                Education Required
                            </div>
                            <div className="p-6 border-l border-gray-100 dark:border-gray-800">
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Bachelor's in Design, HCI, or related field usually required. Portfolio essential.</p>
                            </div>
                            <div className="p-6 border-l border-gray-100 dark:border-gray-800">
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Bachelor's in Business or CS. MBA often preferred for senior roles.</p>
                            </div>
                            <div className="p-6 border-l border-gray-100 dark:border-gray-800">
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Bachelor's in CS helpful but not mandatory. Coding bootcamps popular.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                            <div className="p-6 flex items-center font-semibold text-gray-700 dark:text-gray-300">
                                Growth Potential
                            </div>
                            {[
                                { growth: '+16%', label: 'Projected 10-year growth' },
                                { growth: '+10%', label: 'Projected 10-year growth' },
                                { growth: '+25%', label: 'Projected 10-year growth' }
                            ].map((item, index) => (
                                <div key={index} className="p-6 border-l border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="material-symbols-outlined text-green-600 text-[20px]">trending_up</span>
                                        <span className="text-sm font-bold text-green-600">{item.growth}</span>
                                    </div>
                                    <p className="text-xs text-gray-400">{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                            <div className="p-6 flex items-center font-semibold text-gray-700 dark:text-gray-300">
                                Top Skills
                            </div>
                            <div className="p-6 border-l border-gray-100 dark:border-gray-800">
                                <div className="flex flex-wrap gap-2">
                                    {['Wireframing', 'Prototyping', 'User Research', 'Figma'].map(skill => (
                                        <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 rounded">{skill}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 border-l border-gray-100 dark:border-gray-800">
                                <div className="flex flex-wrap gap-2">
                                    {['Strategy', 'Data Analysis', 'Agile', 'Leadership'].map(skill => (
                                        <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 rounded">{skill}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 border-l border-gray-100 dark:border-gray-800">
                                <div className="flex flex-wrap gap-2">
                                    {['JavaScript', 'React', 'CSS/HTML', 'Git'].map(skill => (
                                        <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 rounded">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                            <div className="p-6 flex items-center font-semibold text-gray-700 dark:text-gray-300">
                                Common Employers
                            </div>
                            <div className="p-6 border-l border-gray-100 dark:border-gray-800">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Tech startups, Agencies, Large Enterprises (Google, Meta).</p>
                            </div>
                            <div className="p-6 border-l border-gray-100 dark:border-gray-800">
                                <p className="text-sm text-gray-600 dark:text-gray-400">SaaS Companies, E-commerce, Fintech firms.</p>
                            </div>
                            <div className="p-6 border-l border-gray-100 dark:border-gray-800">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Any tech-enabled company, Remote-first organizations.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                        Save Comparison
                    </button>
                </div>
            </main>
            <style>{`
                .radial-progress {
                    position: relative;
                    display: inline-flex;
                    width: var(--size);
                    height: var(--size);
                    place-content: center;
                    place-items: center;
                    border-radius: 9999px;
                    box-sizing: content-box;
                    --thickness: 3px;
                }
                .radial-progress:before,
                .radial-progress:after {
                    position: absolute;
                    border-radius: 9999px;
                    content: "";
                }
                .radial-progress:before {
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: radial-gradient(farthest-side, currentColor 98%, #0000) top/var(--thickness) var(--thickness) no-repeat, conic-gradient(currentColor calc(var(--value) * 1%), #0000 0);
                    -webkit-mask: radial-gradient(farthest-side, #0000 calc(99% - var(--thickness)), #000 calc(100% - var(--thickness)));
                    mask: radial-gradient(farthest-side, #0000 calc(99% - var(--thickness)), #000 calc(100% - var(--thickness)));
                }
                .radial-progress:after {
                    inset: calc(50% - var(--thickness) / 2);
                    transform: rotate(calc(var(--value) * 3.6deg - 90deg)) translate(calc(var(--size) / 2 - 50%));
                }
            `}</style>
        </div>
    );
};

export default CompareCareers;
