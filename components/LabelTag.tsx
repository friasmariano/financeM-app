
type LabelTagProps = {
    color: string;
    title: string;
    subtitle?: string;
    titleBold?: boolean;
}

export default function LabelTag({ color, title, subtitle, titleBold }: LabelTagProps) {
    return(
        <div style={{ display: 'flex', margin: '15px', width: titleBold ? '125px' : '115px' }}>
            <div style={{ width: '2.75px', height: '50px',
                          backgroundColor: `${color}`, borderRadius: '10px',
                          boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.5)'}}>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column',
                          justifyContent: 'center',
                          padding: '0px 0px 0px 10px'}}>
                <p style={{ fontSize: titleBold ? '0.9rem': '0.85rem',
                            fontWeight: titleBold ? 'bold': 'normal',
                            color: titleBold ? 'rgb(68, 68, 68)': '' }}>
                    {title}
                </p>
                {subtitle && (<p style={{ fontWeight: '600', fontSize: '1.30rem'}}>
                    {subtitle}
                </p>)}
            </div>
        </div>
    );
}