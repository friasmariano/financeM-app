
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

type CardProps = {
    title: string;
    children: React.ReactNode;
    hasDetails?: boolean;
}

export default function Card({ title, hasDetails, children }: CardProps) {
    return(
        <div style={{ padding: '20px 20px 30px 80px', display: 'flex', gap: '20px', minWidth: '60vw', flexWrap: 'wrap' }}>
            <div className="card card-big neutral-card">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ borderRadius: '30px 25px 25px 0px', width: '160px', height: '60px',
                                background: 'linear-gradient(0deg,rgb(180, 180, 180) 0%,rgb(231, 231, 231) 100%)',
                                padding: '17px 0px 20px 30px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                        <p  style={{ fontSize: '1.4rem', fontWeight: '600' }}>
                        {title}
                        </p>
                </div>

                {hasDetails && (
                    <div style={{ padding: '30px 30px 0px 0px', fontSize: '0.9rem', opacity: '.6'}}>
                        See Details
                    <FontAwesomeIcon icon={faCaretRight}
                        style={{ marginLeft: '5px' }} />
                    </div>
                )}
                </div>

                {/* Body */}
                <div style={{ display: 'flex',
                            height: '100px',
                            marginTop: '25px',
                            borderRadius: '30px'}}>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    );
};