import { MainLayout } from "@/components/Layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from "@/components/ui/badge";

const priorityData = [
  { name: 'Critical', value: 45, color: '#EF4444' },
  { name: 'High', value: 30, color: '#F59E0B' },
  { name: 'Medium', value: 85, color: '#10B981' },
  { name: 'Low', value: 60, color: '#3B82F6' },
];

const categoryData = [
  { time: '00:00-03:00', Critical: 10, High: 15, Medium: 25, Low: 12 },
  { time: '03:00-06:00', Critical: 8, High: 12, Medium: 20, Low: 15 },
  { time: '06:00-09:00', Critical: 15, High: 18, Medium: 30, Low: 20 },
  { time: '09:00-12:00', Critical: 12, High: 20, Medium: 28, Low: 18 },
  { time: '12:00-15:00', Critical: 20, High: 22, Medium: 35, Low: 25 },
  { time: '15:00-18:00', Critical: 18, High: 25, Medium: 32, Low: 22 },
  { time: '18:00-21:00', Critical: 14, High: 20, Medium: 30, Low: 20 },
  { time: '21:00-23:00', Critical: 10, High: 15, Medium: 25, Low: 15 },
];

const ticketsData = [
  { id: 1, requester: 'Neil Gilbert', category: 'Hardware', subject: 'Internet connection is not working properly', technician: 'Neil Gilbert', priority: 'Critical', status: 'Unassigned' },
  { id: 2, requester: 'Keith Boardin', category: 'Firewall', subject: 'Firewall is blocking required applications', technician: 'Keith Boardin', priority: 'High', status: 'Assigned' },
  { id: 3, requester: 'Michael Black', category: 'Network', subject: 'Laptop hardware is malfunctioning during use', technician: 'Michael Black', priority: 'Medium', status: 'On Hold' },
  { id: 4, requester: 'Jesse Mazz', category: 'Software', subject: 'Software installation keeps failing repeatedly', technician: 'Jesse Mazz', priority: 'Low', status: 'Verification' },
  { id: 5, requester: 'Norma Schmitter', category: 'User Access', subject: 'Unable to log in due to user access issue', technician: 'Norma Schmitter', priority: 'High', status: 'Completed' },
];

const Dashboard = () => {
  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6">
        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Tickets by Priority */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">Requests By Priority</h3>
              {/* <Select defaultValue="hardware">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <input type="date" defaultValue="2020-07-20" className="border rounded px-3 py-1 text-sm" />
              <Button size="sm" variant="default" className="bg-success hover:bg-success/90">Day</Button>
              <Button size="sm" variant="outline">Month</Button>
              <Button size="sm" variant="outline">Year</Button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              {priorityData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Tickets by Category */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">Request By Category</h3>
              <Select defaultValue="hardware">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <input type="date" defaultValue="2023-01-01" className="border rounded px-3 py-1 text-sm" />
              <Button size="sm" variant="default" className="bg-success hover:bg-success/90">Day</Button>
              <Button size="sm" variant="outline">Month</Button>
              <Button size="sm" variant="outline">Year</Button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Critical" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="High" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Medium" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Low" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Tickets by Technician */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">Requests By Technician</h3>
              <Select defaultValue="james-smith">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="james-smith">James Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <input type="date" defaultValue="2022-01-01" className="border rounded px-3 py-1 text-sm" />
              <Button size="sm" variant="default" className="bg-success hover:bg-success/90">Day</Button>
              <Button size="sm" variant="outline">Month</Button>
              <Button size="sm" variant="outline">Year</Button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Critical" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="High" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Medium" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Low" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Tickets by Requester */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">Requests By Requester</h3>
              <Select defaultValue="alex-orders">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alex-orders">Alex Orders</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <input type="date" defaultValue="2022-01-07" className="border rounded px-3 py-1 text-sm" />
              <Button size="sm" variant="default" className="bg-success hover:bg-success/90">Day</Button>
              <Button size="sm" variant="outline">Month</Button>
              <Button size="sm" variant="outline">Year</Button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Critical" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="High" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Medium" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Low" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Tickets List */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Requests List</h3>
            <Button variant="link" className="text-primary">View all</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ticketsData.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.requester}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.category}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{ticket.subject}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.technician}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant={ticket.priority === 'Critical' ? 'destructive' : ticket.priority === 'High' ? 'default' : 'secondary'}>
                        {ticket.priority}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge className="bg-success">{ticket.status}</Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-gray-400 hover:text-gray-600">⋮</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
