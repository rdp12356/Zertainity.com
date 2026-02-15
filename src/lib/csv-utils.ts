/**
 * CSV Utilities for User Import/Export
 */

export interface UserCSVRow {
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    location?: string;
}

/**
 * Convert array of objects to CSV string
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function arrayToCSV<T extends Record<string, any>>(data: T[]): string {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvRows = [
        headers.join(','), // Header row
        ...data.map(row =>
            headers.map(header => {
                const value = row[header];
                // Escape quotes and wrap in quotes if contains comma
                const escaped = String(value || '').replace(/"/g, '""');
                return escaped.includes(',') ? `"${escaped}"` : escaped;
            }).join(',')
        )
    ];

    return csvRows.join('\n');
}

/**
 * Parse CSV string to array of objects
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function csvToArray<T = any>(csv: string): T[] {
    const lines = csv.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const rows: T[] = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === headers.length) {
            const row: Record<string, string> = {};
            headers.forEach((header, index) => {
                row[header] = values[index];
            });
            rows.push(row as unknown as T);
        }
    }

    return rows;
}

/**
 * Parse a single CSV line handling quoted values
 */
function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++; // Skip next quote
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current.trim());
    return result;
}

/**
 * Download CSV file
 */
export function downloadCSV(filename: string, csvContent: string) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Validate user CSV row
 */
export function validateUserRow(row: UserCSVRow): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Email validation
    if (!row.email || !row.email.includes('@')) {
        errors.push('Invalid email address');
    }

    // Role validation
    const validRoles = ['owner', 'admin', 'manager', 'editor', 'user'];
    if (!row.role || !validRoles.includes(row.role.toLowerCase())) {
        errors.push(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Generate sample CSV template
 */
export function generateUserCSVTemplate(): string {
    const template: UserCSVRow[] = [
        {
            email: 'user@example.com',
            role: 'user',
            firstName: 'John',
            lastName: 'Doe',
            phone: '+1234567890',
            location: 'New York, USA'
        }
    ];

    return arrayToCSV(template);
}
