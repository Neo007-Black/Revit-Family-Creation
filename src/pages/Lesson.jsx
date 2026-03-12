import { useParams, Navigate } from 'react-router-dom';
import { courseData } from '../data/courseData';
import { FamilyTypeDiagram } from '../components/FamilyTypeDiagram';
import { GeometryBuilder } from '../components/GeometryBuilder';
import { WorkflowChecklist } from '../components/WorkflowChecklist';
import { CategoryTree } from '../components/CategoryTree';
import { ParameterExplorer } from '../components/ParameterExplorer';
import { ConstraintSimulator } from '../components/ConstraintSimulator';
import { LookupSimulator } from '../components/LookupSimulator';
import { FormulaSimulator } from '../components/FormulaSimulator';
import { FamilyConceptSimulator } from '../components/FamilyConceptSimulator';
import { TemplateSelector } from '../components/TemplateSelector';
import { ReferenceSimulator } from '../components/ReferenceSimulator';
import { TestingZoneSimulator } from '../components/TestingZoneSimulator';
import { FamilyTypeTree } from '../components/FamilyTypeTree';
import { FamilyTypeTabs } from '../components/FamilyTypeTabs';

export function Lesson() {
    const { id } = useParams();
    const lesson = courseData.find(l => l.id === id);

    if (!lesson) {
        return <Navigate to="/" />;
    }

    const createMarkup = (markdown) => {
        let html = markdown
            .replace(/^### (.*$)/gim, '<h4 style="color: var(--accent); margin-top: 2rem; display: flex; align-items: center; gap: 0.5rem;"><span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0;"></span>$1</h4>')
            .replace(/^## (.*$)/gim, '<h3 style="margin-top: 2.5rem; padding: 0.6rem 0 0.6rem 1rem; color: #000; border-left: 4px solid var(--accent); background: rgba(225, 29, 72, 0.05); border-radius: 0 8px 8px 0;">$1</h3>')
            .replace(/^# (.*$)/gim, '<h2 style="font-size: 2.5rem; color: #000; display: flex; align-items: center; gap: 0.75rem;"><span style="display: inline-block; width: 5px; height: 36px; border-radius: 3px; background: linear-gradient(180deg, var(--accent), #38bdf8); flex-shrink: 0;"></span>$1</h2>')
            .replace(/\*\*(.*?)\*\*/gim, '<strong style="color: #000; font-weight: 700;">$1</strong>')
            .replace(/^- (.*$)/gim, '<div style="display: flex; align-items: flex-start; gap: 0.65rem; margin: 0.4rem 0 0.4rem 0.5rem;"><span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); margin-top: 0.55rem; flex-shrink: 0;"></span><span>$1</span></div>')
            .replace(/\n/gim, '<br />');

        html = html.replace('<FamilyTypeDiagram />', '');
        html = html.replace('<GeometryBuilder />', '');
        html = html.replace('<WorkflowChecklist />', '');
        html = html.replace('<CategoryTree />', '');
        html = html.replace('<ParameterExplorer />', '');
        html = html.replace('<ConstraintSimulator />', '');
        html = html.replace('<LookupSimulator />', '');
        html = html.replace('<FormulaSimulator />', '');
        html = html.replace('<FamilyConceptSimulator />', '');
        html = html.replace('<TemplateSelector />', '');
        html = html.replace('<ReferenceSimulator />', '');
        html = html.replace('<TestingZoneSimulator />', '');
        html = html.replace('<FamilyTypeTree />', '');
        html = html.replace('<FamilyTypeTabs />', '');

        return { __html: html };
    };

    return (
        <div className="animate-fade-in" style={{ width: '100%', margin: '0', padding: '0' }}>

            <div className="glass-panel" style={{ padding: '3rem 4rem', borderRadius: '0', borderLeft: 'none', borderRight: 'none', minHeight: 'calc(100vh - 120px)' }}>

                {lesson.content.includes('<FamilyTypeTree />') && <FamilyTypeTree />}

                <div
                    className="markdown-content"
                    style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
                    dangerouslySetInnerHTML={createMarkup(lesson.content.trim())}
                />

                {lesson.content.includes('<FamilyTypeDiagram />') && <FamilyTypeDiagram />}
                {lesson.content.includes('<GeometryBuilder />') && <GeometryBuilder />}
                {lesson.content.includes('<WorkflowChecklist />') && <WorkflowChecklist />}
                {lesson.content.includes('<CategoryTree />') && <CategoryTree />}
                {lesson.content.includes('<ParameterExplorer />') && <ParameterExplorer />}
                {lesson.content.includes('<ConstraintSimulator />') && <ConstraintSimulator />}
                {lesson.content.includes('<LookupSimulator />') && <LookupSimulator />}
                {lesson.content.includes('<FormulaSimulator />') && <FormulaSimulator />}
                {lesson.content.includes('<FamilyConceptSimulator />') && <FamilyConceptSimulator />}
                {lesson.content.includes('<TemplateSelector />') && <TemplateSelector />}
                {lesson.content.includes('<ReferenceSimulator />') && <ReferenceSimulator />}
                {lesson.content.includes('<TestingZoneSimulator />') && <TestingZoneSimulator />}
                {lesson.content.includes('<FamilyTypeTabs />') && <FamilyTypeTabs />}

            </div>
        </div>
    );
}
