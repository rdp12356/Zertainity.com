import { Link } from 'react-router';

export default function Index() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Zertainity Career Guidance
                    </h1>
                    <p className="text-xl text-gray-600">
                        Discover your path to success with personalized career guidance
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <Link
                        to="/quiz"
                        className="group p-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="text-3xl mb-3">📝</div>
                        <h3 className="text-xl font-bold mb-2">Career Assessment</h3>
                        <p className="text-purple-100">
                            Take our comprehensive quiz to discover your ideal career path
                        </p>
                    </Link>

                    <Link
                        to="/scholarships"
                        className="group p-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl text-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="text-3xl mb-3">🎓</div>
                        <h3 className="text-xl font-bold mb-2">Scholarships</h3>
                        <p className="text-green-100">
                            Find scholarships and funding opportunities for your education
                        </p>
                    </Link>

                    <Link
                        to="/profile"
                        className="group p-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="text-3xl mb-3">👤</div>
                        <h3 className="text-xl font-bold mb-2">Your Profile</h3>
                        <p className="text-orange-100">
                            Manage your account and view your assessment history
                        </p>
                    </Link>
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>Powered by Shopify Hydrogen & Supabase</p>
                </div>
            </div>
        </div>
    );
}
