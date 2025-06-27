
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

type CardProps = {
    title: string;
    children: React.ReactNode;
    detailsText?: string;
    hasDetails?: boolean;
    height?: string;
    width?: string;
    headerWidth?: string;
}

export default function Card({ title, hasDetails, children, width = "500px", height = "265px", headerWidth = "180px", detailsText = 'See Details' }: CardProps) {
    return(
        <div style={{ padding: '20px 20px 30px 0px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div className="card neutral-card"
                 style={{ width: `${width}`, height: `${height}` }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ borderRadius: '30px 25px 25px 0px', width: `${headerWidth}`, height: '60px',
                                background: 'var(--card-header-gradient)',
                                padding: '17px 0px 20px 30px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                    <p  style={{ fontSize: '1.4rem', fontWeight: '600' }}>
                        {title}
                    </p>
                </div>

                {hasDetails && (
                    <div style={{ padding: '30px 30px 0px 0px', fontSize: '0.9rem', opacity: '.6'}}>
                        {detailsText}
                    <FontAwesomeIcon icon={faCaretRight}
                        style={{ marginLeft: '5px' }} />
                    </div>
                )}
                </div>

                {/* Body */}
                <div style={{
                              marginTop: '25px',
                              borderRadius: '30px'}}>
                    {children}
                </div>
            </div>
        </div>
    );
};