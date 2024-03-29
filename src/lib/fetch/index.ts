class FetchClient {
    private async request(
        url: string,
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
        data: any = null
    ): Promise<any> {
        const token: string | null = this.getTokenFromCookie();

        const options: RequestInit = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '', // Include the Bearer token in the headers if available
            },
            body: data ? JSON.stringify(data) : null,
        };

        const _res: Response = await fetch(`/api${url}`, options);
        const res: { success: boolean, data?: any, message?: string } = await _res.json();
        return res;
    }

    private getTokenFromCookie(): string | null {
        const cookieName: string = 'access_token';
        const cookies: string[] = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name.trim() === cookieName) {
                return value;
            }
        }
        return null; // Return null if token not found in cookies
    }

    public async get(url: string): Promise<any> {
        return this.request(url, 'GET');
    }

    public async post(url: string, data: any): Promise<any> {
        return this.request(url, 'POST', data);
    }

    public async put(url: string, data: any): Promise<any> {
        return this.request(url, 'PUT', data);
    }

    public async patch(url: string, data: any): Promise<any> {
        return this.request(url, 'PATCH', data);
    }

    public async delete(url: string): Promise<any> {
        return this.request(url, 'DELETE');
    }
}

const ApiClient = new FetchClient();
export default ApiClient