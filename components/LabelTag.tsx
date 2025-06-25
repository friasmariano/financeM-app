
type LabelTagProps = {
    color: string;
    title: string;
    subtitle: string;
}

export default function LabelTag({ color, title, subtitle }: LabelTagProps) {
    return(
        <div style={{ display: 'flex', margin: '15px', width: '105px' }}>
            <div style={{ width: '2.75px', height: '50px',
                          backgroundColor: `${color}`, borderRadius: '10px',
                          boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.5)'}}>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 0px 0px 10px'}}>
                <p style={{ fontSize: '0.85rem' }}>
                    {title}
                </p>
                <p style={{ fontWeight: '600', fontSize: '1.30rem'}}>
                    {subtitle}
                </p>
            </div>
        </div>
    );
}