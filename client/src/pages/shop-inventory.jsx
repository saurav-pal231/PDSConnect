import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/auth';
import { useLocation } from 'wouter';
import Sidebar from '@/components/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Download, Search } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

// Utility to export JSON -> CSV
const exportToCSV = (data, filename = 'inventory.csv') => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]).join(',');
  const rows = data
    .map((row) =>
      Object.values(row)
        .map((val) => `"${val}"`)
        .join(',')
    )
    .join('\n');

  const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
  const link = document.createElement('a');
  link.href = encodeURI(csvContent);
  link.download = filename;
  link.click();
};

export default function Inventory() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'shop') {
      setLocation('/login');
    }
  }, [isAuthenticated, user, setLocation]);

  const { data: stockData = [], isLoading } = useQuery({
    queryKey: ['/api/stock', user?.shopId],
    queryFn: async () => {
      const res = await apiRequest('GET', `/api/stock/${user?.shopId}`);
      return res.json();
    },
    enabled: !!user?.shopId
  });

  if (!isAuthenticated || user?.role !== 'shop') {
    return null;
  }

  const filteredStock = stockData.filter((item) =>
    item.itemType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="shop" userInfo={user} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card shadow-sm border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
            <Button
              onClick={() => exportToCSV(filteredStock)}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stock Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Search Bar */}
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    placeholder="Search item..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-xs"
                  />
                  <Search className="text-muted-foreground" />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-border rounded-lg">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-2 text-left">Item</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Unit</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="5" className="text-center py-6">
                            Loading...
                          </td>
                        </tr>
                      ) : filteredStock.length > 0 ? (
                        filteredStock.map((item, idx) => {
                          const status =
                            item.quantity === 0
                              ? 'Empty'
                              : item.quantity < (item.itemType === 'kerosene' ? 50 : 100)
                              ? 'Low'
                              : 'Sufficient';

                          return (
                            <tr key={idx} className="border-t border-border">
                              <td className="px-4 py-2 capitalize">{item.itemType}</td>
                              <td className="px-4 py-2">{item.quantity}</td>
                              <td className="px-4 py-2">
                                {item.itemType === 'kerosene' ? 'L' : 'Kg'}
                              </td>
                              <td className="px-4 py-2">
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    status === 'Empty'
                                      ? 'bg-red-100 text-red-700'
                                      : status === 'Low'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-green-100 text-green-700'
                                  }`}
                                >
                                  {status}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-sm text-muted-foreground">
                                {new Date(item.lastUpdated).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-6">
                            No items found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
