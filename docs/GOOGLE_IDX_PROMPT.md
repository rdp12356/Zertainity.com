# Google Project IDX (Stitch) - Development Prompt
## Zertainity AI-Powered Career Guidance Platform

**Purpose:** This prompt provides comprehensive context for AI-assisted development in Google Project IDX (Stitch)  
**Date:** February 7, 2026  
**Version:** 2.0

---

## 🎯 Project Overview

**Project Name:** Zertainity  
**Type:** AI-Powered Career Guidance Platform  
**Target Users:** Students (10th-12th grade, undergraduates, graduates) in India  
**Mission:** Democratize access to quality career counseling through AI-driven personalized recommendations

---

## 📋 Core Context for AI Assistant

### What is Zertainity?

Zertainity is a comprehensive career guidance platform that helps students discover their ideal career paths through:
1. **Multi-dimensional Assessment** - Academic performance + interest quiz + skill tests
2. **AI-Powered Recommendations** - Personalized career matches with 80%+ accuracy
3. **Detailed Career Pathways** - Step-by-step roadmaps from current education to dream career
4. **Mentorship & Learning** - Connect with industry professionals and curated courses
5. **Job Portal** - Internships, jobs, resume builder, interview prep

### Key Differentiators
- Apple-inspired minimalist design (neutral colors, generous whitespace)
- Enterprise-grade RBAC (5 roles: Owner, Admin, Manager, Editor, User)
- Comprehensive platform (assessment → learning → mentorship → placement)
- Mobile-first responsive design
- Multilingual support (10+ Indian languages)

---

## 🛠️ Technology Stack

### Frontend
```
- Framework: React 18 + TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS (custom design tokens)
- UI Components: shadcn/ui (Radix UI primitives)
- State Management: TanStack React Query
- Routing: React Router DOM v6
- Forms: React Hook Form + Zod validation
- Icons: Lucide React
- Animations: Framer Motion
```

### Backend
```
- Database: Supabase (PostgreSQL)
- Authentication: Supabase Auth (Email + Google OAuth)
- Edge Functions: Supabase Edge Functions (Deno)
- Real-time: Supabase Realtime
- Storage: Supabase Storage
- Security: Row-Level Security (RLS) policies
```

### Development Tools
```
- Language: TypeScript (strict mode)
- Linting: ESLint
- Testing: Jest + React Testing Library
- Package Manager: npm
- Version Control: Git
```

---

## 📁 Project Structure

```
zertainity/
├── src/
│   ├── components/
│   │   ├── admin/              # Admin panel components
│   │   │   ├── CSVImport.tsx
│   │   │   ├── EmailConfigToggle.tsx
│   │   │   ├── PermissionsManager.tsx
│   │   │   └── UserProfileCard.tsx
│   │   └── ui/                 # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ... (40+ components)
│   ├── pages/
│   │   ├── Index.tsx           # Landing page
│   │   ├── Auth.tsx            # Login/Signup
│   │   ├── EducationLevel.tsx  # Step 1: Select education level
│   │   ├── MarksEntry.tsx      # Step 2: Enter marks
│   │   ├── Quiz.tsx            # Step 3: Interest assessment
│   │   ├── Results.tsx         # Step 4: Career recommendations
│   │   ├── Pathways.tsx        # Career pathways
│   │   ├── Careers.tsx         # Career database
│   │   ├── Admin.tsx           # Admin dashboard
│   │   ├── Profile.tsx         # User profile
│   │   ├── Setup.tsx           # First-time admin setup
│   │   └── NotFound.tsx        # 404 page
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── usePermission.tsx
│   ├── integrations/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Supabase client
│   │   │   └── types.ts        # Database types
│   │   └── lovable/
│   │       └── index.ts        # OAuth helpers
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── services/
│   │   └── api.ts              # API service layer
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── supabase/
│   ├── functions/              # Edge Functions
│   │   ├── setup-admin/
│   │   ├── invite-user/
│   │   ├── update-user-role/
│   │   ├── suspend-user/
│   │   ├── unsuspend-user/
│   │   ├── delete-user/
│   │   ├── export-users/
│   │   └── send-notification/
│   └── migrations/             # Database migrations
├── docs/
│   ├── PRD.md                  # Product Requirements (v2.0)
│   ├── STRATEGIC_SUGGESTIONS.md # Strategic recommendations
│   ├── SUMMARY.md              # Executive summary
│   └── project-specification.md # Technical specification
├── public/                     # Static assets
├── .env                        # Environment variables
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## 🎨 Design System

### Color Palette (HSL - Neutral/Monochrome)
```css
:root {
  --background: 0 0% 100%;        /* White */
  --foreground: 0 0% 3.9%;        /* Almost black */
  --card: 0 0% 100%;              /* White */
  --card-foreground: 0 0% 3.9%;   /* Almost black */
  --primary: 0 0% 9%;             /* Dark gray */
  --primary-foreground: 0 0% 98%; /* Off-white */
  --secondary: 0 0% 96.1%;        /* Light gray */
  --secondary-foreground: 0 0% 9%; /* Dark gray */
  --muted: 0 0% 96.1%;            /* Light gray */
  --muted-foreground: 0 0% 45.1%; /* Medium gray */
  --accent: 0 0% 96.1%;           /* Light gray */
  --accent-foreground: 0 0% 9%;   /* Dark gray */
  --border: 0 0% 89.8%;           /* Light gray border */
  --input: 0 0% 89.8%;            /* Light gray */
  --ring: 0 0% 3.9%;              /* Dark gray */
  --radius: 0.5rem;               /* Border radius */
}
```

### Typography
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
font-weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
line-height: 1.5-1.75 for body text
letter-spacing: Subtle tracking for headings
```

### Design Principles
- **Minimalist**: Clean interfaces, no clutter
- **Neutral Palette**: No colorful gradients, monochrome focus
- **Generous Whitespace**: Breathing room between elements
- **Content-First**: Information hierarchy over decoration
- **Subtle Shadows**: Depth without being heavy
- **No Decorative Images**: Focus on content and data

---

## 🗄️ Database Schema

### Core Tables

#### user_roles
```sql
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
```

#### role_permissions
```sql
CREATE TABLE public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role app_role NOT NULL,
  permission app_permission NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (role, permission)
);
```

#### user_profiles
```sql
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  avatar_url TEXT,
  bio TEXT,
  phone_number TEXT,
  date_of_birth DATE,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### colleges
```sql
CREATE TABLE public.colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  courses TEXT[],
  cutoffs TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### schools
```sql
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  board TEXT,
  grade_11_cutoff NUMERIC,
  latitude NUMERIC,
  longitude NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### audit_log
```sql
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action TEXT NOT NULL,
  target_user_id UUID,
  before_snapshot JSONB,
  after_snapshot JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Enums
```sql
CREATE TYPE public.app_role AS ENUM ('owner', 'admin', 'manager', 'editor', 'user');

CREATE TYPE public.app_permission AS ENUM (
  'view_all', 'edit_careers', 'edit_colleges', 'edit_schools',
  'edit_pathways', 'edit_quiz', 'view_users', 'manage_users',
  'manage_roles', 'manage_permissions', 'view_audit_logs', 'export_data'
);
```

---

## 🔐 Authentication & Authorization

### Authentication Flow
1. User signs up with email/password or Google OAuth
2. Email verification required (not auto-confirmed)
3. User profile created automatically
4. Default role: 'user'
5. Session managed by Supabase Auth (JWT tokens)

### Role-Based Access Control (RBAC)

| Role | Permissions |
|------|-------------|
| **Owner** | All permissions (full system control) |
| **Admin** | view_all, view_users, manage_users, manage_roles, view_audit_logs, export_data, all edit_* |
| **Manager** | view_all, view_users, manage_users, view_audit_logs |
| **Editor** | view_all, edit_careers, edit_colleges, edit_schools, edit_pathways, edit_quiz |
| **User** | view_all (basic access) |

### Row-Level Security (RLS)
All tables have RLS enabled. Key policies:
- Users can view their own data
- Admins can view all users
- Owners can manage all roles
- Editors can modify content based on permissions

---

## 🚀 Key Features to Implement

### Phase 1: MVP (Priority P0)
1. **User Authentication**
   - Email/password signup and login
   - Google OAuth integration
   - Email verification workflow
   - Session management

2. **Career Assessment Flow**
   - Education level selection (10th, 12th, Graduate)
   - Academic marks entry (dynamic form based on level)
   - Interest assessment quiz (20-30 questions)
   - AI-powered career recommendations (5-10 careers)

3. **Admin Panel**
   - User management (view, invite, suspend, delete)
   - Role assignment
   - Audit logging
   - CSV import/export

4. **Career Database**
   - 50+ career profiles
   - Search and filter
   - Detailed career information
   - Related careers

### Phase 2: Enhanced Features (Priority P1)
5. **AI Chatbot**
   - 24/7 career guidance
   - Natural language processing
   - Context-aware responses
   - Multilingual support

6. **Skill Assessments**
   - Technical skill tests (coding, design, business)
   - Soft skills evaluation
   - Adaptive testing
   - Certificates and badges

7. **Learning Resources**
   - Course recommendations (Coursera, Udemy integration)
   - Scholarship finder
   - Progress tracking

8. **Job Portal**
   - Internship and job listings
   - Resume builder
   - Application tracking
   - Interview preparation

9. **Mobile App**
   - Progressive Web App (PWA)
   - Offline mode
   - Push notifications

### Phase 3: Advanced Features (Priority P2)
10. **Mentorship Platform**
    - Mentor matching algorithm
    - In-app messaging
    - Video call scheduling
    - Rating and reviews

11. **Live Sessions**
    - Expert webinars
    - Virtual career fairs
    - Q&A sessions

12. **Gamification**
    - Achievement system
    - Leaderboards
    - Challenges and competitions

---

## 💻 Development Guidelines

### Code Style
```typescript
// Use functional components with TypeScript
import React from 'react';

interface CareerCardProps {
  title: string;
  description: string;
  matchPercentage: number;
  onSelect: () => void;
}

export const CareerCard: React.FC<CareerCardProps> = ({
  title,
  description,
  matchPercentage,
  onSelect
}) => {
  return (
    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium">{matchPercentage}% Match</span>
        <button onClick={onSelect} className="btn-primary">
          Explore
        </button>
      </div>
    </div>
  );
};
```

### Naming Conventions
- **Components**: PascalCase (e.g., `CareerCard.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `usePermission.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_CAREERS`)
- **Types/Interfaces**: PascalCase (e.g., `UserProfile`)

### File Organization
- One component per file
- Co-locate related components in folders
- Keep components small and focused (< 200 lines)
- Extract complex logic into custom hooks
- Use barrel exports (index.ts) for cleaner imports

### State Management
```typescript
// Use React Query for server state
import { useQuery, useMutation } from '@tanstack/react-query';

export const useCareerRecommendations = (userId: string) => {
  return useQuery({
    queryKey: ['careers', userId],
    queryFn: () => fetchCareerRecommendations(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Use local state for UI state
const [isOpen, setIsOpen] = useState(false);
```

### Error Handling
```typescript
try {
  const { data, error } = await supabase
    .from('careers')
    .select('*')
    .eq('id', careerId);
  
  if (error) throw error;
  return data;
} catch (error) {
  console.error('Error fetching career:', error);
  toast.error('Failed to load career information');
  return null;
}
```

---

## 🔧 Environment Variables

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://yxjqnnmknxzucnzjtniu.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_PROJECT_ID=yxjqnnmknxzucnzjtniu

# Optional: Analytics, Monitoring
VITE_GA_TRACKING_ID=
VITE_SENTRY_DSN=
```

---

## 📝 Common Development Tasks

### 1. Create a New Page
```typescript
// src/pages/NewPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold">New Page</h1>
      {/* Page content */}
    </div>
  );
};

export default NewPage;

// Add route in App.tsx
<Route path="/new-page" element={<NewPage />} />
```

### 2. Create a New Component
```typescript
// src/components/MyComponent.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  className?: string;
  children: React.ReactNode;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  className,
  children
}) => {
  return (
    <div className={cn('base-styles', className)}>
      {children}
    </div>
  );
};
```

### 3. Add a Database Query
```typescript
// src/services/careerService.ts
import { supabase } from '@/integrations/supabase/client';

export const fetchCareers = async (filters?: {
  category?: string;
  educationLevel?: string;
}) => {
  let query = supabase.from('careers').select('*');
  
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  
  if (filters?.educationLevel) {
    query = query.contains('required_education', [filters.educationLevel]);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};
```

### 4. Create a Custom Hook
```typescript
// src/hooks/useCareerSearch.ts
import { useState, useEffect } from 'react';
import { fetchCareers } from '@/services/careerService';

export const useCareerSearch = (searchTerm: string) => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchCareers = async () => {
      if (!searchTerm) {
        setCareers([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await fetchCareers({ searchTerm });
        setCareers(results);
      } catch (err) {
        setError('Failed to search careers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchCareers, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return { careers, loading, error };
};
```

### 5. Add Form Validation
```typescript
// src/components/forms/AssessmentForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const assessmentSchema = z.object({
  educationLevel: z.enum(['10th', '12th', 'graduate']),
  mathematics: z.number().min(0).max(100),
  science: z.number().min(0).max(100),
  english: z.number().min(0).max(100),
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;

export const AssessmentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
  });

  const onSubmit = (data: AssessmentFormData) => {
    console.log('Form data:', data);
    // Submit to API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

---

## 🎯 AI Assistant Instructions

### When Helping with Development:

1. **Follow Design System**
   - Use only neutral colors (grays, blacks, whites)
   - Apply generous whitespace
   - Keep interfaces clean and minimal
   - Use shadcn/ui components

2. **Maintain Type Safety**
   - Always use TypeScript
   - Define proper interfaces/types
   - Avoid `any` type
   - Use strict mode

3. **Code Quality**
   - Write clean, readable code
   - Add comments for complex logic
   - Follow naming conventions
   - Keep components small and focused

4. **Performance**
   - Use React Query for data fetching
   - Implement lazy loading
   - Optimize images
   - Code splitting for routes

5. **Accessibility**
   - Use semantic HTML
   - Add ARIA labels
   - Ensure keyboard navigation
   - Maintain color contrast (WCAG AA)

6. **Security**
   - Never expose sensitive data
   - Validate all inputs
   - Use RLS policies
   - Sanitize user content

7. **Testing**
   - Write unit tests for utilities
   - Test critical user flows
   - Handle error cases
   - Mock API calls

---

## 🚦 Development Workflow

### 1. Starting Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

### 2. Creating New Features
1. Create feature branch: `git checkout -b feature/feature-name`
2. Implement feature following guidelines
3. Test thoroughly
4. Commit with descriptive message
5. Push and create pull request

### 3. Database Changes
1. Create migration file in `supabase/migrations/`
2. Test migration locally
3. Apply to production via Supabase dashboard
4. Update TypeScript types

### 4. Deployment
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to hosting (Vercel, Netlify, etc.)
```

---

## 📚 Key Resources

### Documentation
- [PRD.md](./PRD.md) - Complete product requirements
- [STRATEGIC_SUGGESTIONS.md](./STRATEGIC_SUGGESTIONS.md) - Strategic recommendations
- [project-specification.md](./project-specification.md) - Technical specification

### External Resources
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)
- [React Query](https://tanstack.com/query/latest)

---

## 🎨 Example Prompts for AI Assistant

### Creating Components
```
"Create a CareerCard component that displays career title, description, 
match percentage, and an explore button. Use shadcn/ui Card component 
and follow the neutral design system. Include TypeScript types and 
hover effects."
```

### Building Pages
```
"Build the EducationLevel page where users select their current education 
level (10th, 12th, or Graduate). Display three cards with icons, 
descriptions, and selection state. On selection, navigate to /marks-entry 
and store the selection in React Query state."
```

### Database Queries
```
"Create a service function to fetch career recommendations based on user's 
assessment results. Query the careers table, filter by required education 
level, calculate match score based on marks and interests, and return top 
10 matches sorted by score. Include error handling and TypeScript types."
```

### Forms
```
"Build a marks entry form for 12th grade students. Include fields for 
Physics, Chemistry, Mathematics, English, and an optional subject. 
Use React Hook Form with Zod validation (0-100 range). Calculate 
percentage automatically. Style with shadcn/ui form components."
```

### API Integration
```
"Create a custom hook useCareerRecommendations that fetches career 
recommendations from Supabase based on user assessment. Use React Query 
for caching and loading states. Handle errors gracefully with toast 
notifications."
```

---

## ✅ Quality Checklist

Before considering a feature complete:

- [ ] TypeScript types defined
- [ ] Component follows design system
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Success/error notifications shown
- [ ] Code commented where necessary
- [ ] No console errors or warnings
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Performance optimized (lazy loading, code splitting)
- [ ] Security considerations addressed

---

## 🎯 Current Priority Tasks

### Immediate (This Week)
1. Complete career assessment flow (4 steps)
2. Implement AI recommendation algorithm
3. Build career database with 50 careers
4. Add search and filter functionality

### Short-term (This Month)
1. Admin panel user management
2. Role-based access control
3. Email verification workflow
4. Audit logging system

### Medium-term (Next 3 Months)
1. AI chatbot integration
2. Skill assessment tests
3. Learning resource recommendations
4. Mobile PWA

---

## 💡 Tips for AI-Assisted Development

1. **Be Specific**: Provide clear requirements and context
2. **Reference Existing Code**: Point to similar components for consistency
3. **Iterate**: Start simple, then enhance
4. **Test Frequently**: Verify each change works as expected
5. **Follow Conventions**: Maintain consistency with existing codebase
6. **Ask Questions**: Clarify requirements before implementing
7. **Document**: Add comments and update docs as needed

---

## 🚀 Let's Build Zertainity!

This platform has the potential to impact millions of students. Focus on:
- **User Experience**: Make it delightful and intuitive
- **Accuracy**: Career recommendations must be reliable
- **Performance**: Fast and responsive on all devices
- **Accessibility**: Inclusive for all students
- **Security**: Protect user data and privacy

**Remember:** We're not just building software; we're building a tool that will shape students' futures. Every feature should add real value to their career journey.

---

**Ready to start coding? Let's go! 🚀**
