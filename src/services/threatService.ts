// Service to fetch real-world threat indicators from public sources
// Attribution: SANS Internet Storm Center (DShield)

export interface ThreatEvent {
    ip: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    type: string;
}

const ATTACK_LABELS = [
    'Credential Brute-force',
    'Lateral Movement',
    'Data Exfiltration',
    'CVE Exploitation',
    'C2 Heartbeat',
    'Botnet Infiltration'
];

// Fallback data in case of API failure or rate limit
const SEED_DATA: ThreatEvent[] = [
    { ip: '185.220.101.44', city: 'Berlin', country: 'Germany', lat: 52.52, lng: 13.40, type: 'C2 Heartbeat' },
    { ip: '103.114.164.21', city: 'Tokyo', country: 'Japan', lat: 35.68, lng: 139.65, type: 'Zero-Day Delivery' },
    { ip: '45.146.164.110', city: 'Moscow', country: 'Russia', lat: 55.75, lng: 37.61, type: 'Botnet Infiltration' },
    { ip: '157.240.22.35', city: 'Mumbia', country: 'India', lat: 19.07, lng: 72.87, type: 'Logic Bypass' },
    { ip: '31.13.71.36', city: 'London', country: 'UK', lat: 51.50, lng: -0.12, type: 'Artifact Extraction' }
];

export async function fetchLiveThreats(): Promise<ThreatEvent[]> {
    try {
        // 1. Fetch Top 10 Attacking IPs from DShield (SANS ISC)
        const dshieldRes = await fetch('https://isc.sans.edu/api/topips/10?json');
        if (!dshieldRes.ok) throw new Error('DShield reachability failure');
        const data = await dshieldRes.json();

        // 2. Geocode the IPs using freeipapi.com (CORS friendly)
        const events: ThreatEvent[] = [];
        const topIps = data.slice(0, 5);
        
        for (const entry of topIps) {
            try {
                const geoRes = await fetch(`https://freeipapi.com/api/json/${entry.ip}`);
                if (geoRes.ok) {
                    const geo = await geoRes.json();
                    if (geo.latitude && geo.longitude) {
                        events.push({
                            ip: entry.ip,
                            city: geo.cityName || 'Unknown Node',
                            country: geo.countryName || 'Shadow Network',
                            lat: geo.latitude,
                            lng: geo.longitude,
                            type: ATTACK_LABELS[Math.floor(Math.random() * ATTACK_LABELS.length)]
                        });
                    }
                }
            } catch (err) {
                console.error(`Geo lookup failed for ${entry.ip}`, err);
            }
        }

        return events.length > 0 ? events : SEED_DATA;
    } catch (error) {
        console.error('Threat Feed Error (Falling back to Seed Data):', error);
        return SEED_DATA;
    }
}
