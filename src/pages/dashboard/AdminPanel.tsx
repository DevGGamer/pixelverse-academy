import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  UserPlus, 
  Pencil, 
  Trash2, 
  Shield,
  GraduationCap,
  Users as UsersIcon,
  Search
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'admin' | 'student' | 'teacher' | 'parent';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: UserRole;
  assignedCourses?: {
    courseId: string;
    courseName: string;
    teacherId: string;
    teacherName: string;
    startDate: string;
  }[];
}

const roleLabels: Record<UserRole, string> = {
  admin: 'Админ',
  student: 'Ученик',
  teacher: 'Учитель',
  parent: 'Родитель',
};

const roleIcons: Record<UserRole, typeof Shield> = {
  admin: Shield,
  student: GraduationCap,
  teacher: UsersIcon,
  parent: UsersIcon,
};

const mockCourses = [
  { id: '1', name: 'Python для начинающих' },
  { id: '2', name: 'Создание игр на Scratch' },
  { id: '3', name: 'Веб-разработка' },
  { id: '4', name: 'Разработка мобильных приложений' },
];

const mockTeachers = [
  { id: 't1', name: 'Александр Петров' },
  { id: 't2', name: 'Мария Иванова' },
  { id: 't3', name: 'Дмитрий Козлов' },
];

const initialUsers: UserData[] = [
  {
    id: '1',
    firstName: 'Алексей',
    lastName: 'Смирнов',
    phone: '+7 (999) 123-45-67',
    email: 'alexey@example.com',
    role: 'student',
    assignedCourses: [
      { courseId: '1', courseName: 'Python для начинающих', teacherId: 't1', teacherName: 'Александр Петров', startDate: '2024-01-15' }
    ]
  },
  {
    id: '2',
    firstName: 'Мария',
    lastName: 'Иванова',
    phone: '+7 (999) 234-56-78',
    email: 'maria@example.com',
    role: 'teacher',
  },
  {
    id: '3',
    firstName: 'Дмитрий',
    lastName: 'Козлов',
    phone: '+7 (999) 345-67-89',
    email: 'dmitry@example.com',
    role: 'admin',
  },
  {
    id: '4',
    firstName: 'Елена',
    lastName: 'Волкова',
    phone: '+7 (999) 456-78-90',
    email: 'elena@example.com',
    role: 'parent',
  },
];

const AdminPanel = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    role: 'student' as UserRole,
  });
  
  // Student course assignments
  const [courseAssignments, setCourseAssignments] = useState<{
    courseId: string;
    teacherId: string;
    startDate: string;
  }[]>([]);

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      role: 'student',
    });
    setCourseAssignments([]);
  };

  const handleCreateUser = () => {
    const newUser: UserData = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      role: formData.role,
      assignedCourses: formData.role === 'student' ? courseAssignments.map(ca => ({
        ...ca,
        courseName: mockCourses.find(c => c.id === ca.courseId)?.name || '',
        teacherName: mockTeachers.find(t => t.id === ca.teacherId)?.name || '',
      })) : undefined,
    };
    
    setUsers([...users, newUser]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast({
      title: 'Пользователь создан',
      description: `${newUser.firstName} ${newUser.lastName} успешно добавлен`,
    });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id 
        ? {
            ...user,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            role: formData.role,
            assignedCourses: formData.role === 'student' ? courseAssignments.map(ca => ({
              ...ca,
              courseName: mockCourses.find(c => c.id === ca.courseId)?.name || '',
              teacherName: mockTeachers.find(t => t.id === ca.teacherId)?.name || '',
            })) : undefined,
          }
        : user
    );
    
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    resetForm();
    toast({
      title: 'Пользователь обновлён',
      description: 'Данные успешно сохранены',
    });
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
    toast({
      title: 'Пользователь удалён',
      description: `${selectedUser.firstName} ${selectedUser.lastName} удалён из системы`,
      variant: 'destructive',
    });
  };

  const openEditDialog = (user: UserData) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      password: '',
      role: user.role,
    });
    setCourseAssignments(user.assignedCourses?.map(ac => ({
      courseId: ac.courseId,
      teacherId: ac.teacherId,
      startDate: ac.startDate,
    })) || []);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const addCourseAssignment = () => {
    setCourseAssignments([...courseAssignments, { courseId: '', teacherId: '', startDate: '' }]);
  };

  const updateCourseAssignment = (index: number, field: string, value: string) => {
    const updated = [...courseAssignments];
    updated[index] = { ...updated[index], [field]: value };
    setCourseAssignments(updated);
  };

  const removeCourseAssignment = (index: number) => {
    setCourseAssignments(courseAssignments.filter((_, i) => i !== index));
  };

  const UserFormContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Имя</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Введите имя"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Фамилия</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Введите фамилию"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+7 (999) 123-45-67"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Электронная почта</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="email@example.com"
          />
        </div>
      </div>

      {!selectedUser && (
        <div className="space-y-2">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Введите пароль"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="role">Роль пользователя</Label>
        <Select 
          value={formData.role} 
          onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите роль" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Админ</SelectItem>
            <SelectItem value="student">Ученик</SelectItem>
            <SelectItem value="teacher">Учитель</SelectItem>
            <SelectItem value="parent">Родитель</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Student Course Assignments */}
      {formData.role === 'student' && (
        <div className="space-y-4 p-4 rounded-xl bg-card/50 border border-border/50">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Назначенные курсы</Label>
            <Button type="button" variant="outline" size="sm" onClick={addCourseAssignment}>
              + Добавить курс
            </Button>
          </div>
          
          {courseAssignments.map((assignment, index) => (
            <div key={index} className="grid grid-cols-4 gap-3 items-end p-3 rounded-lg bg-background/50">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Курс</Label>
                <Select
                  value={assignment.courseId}
                  onValueChange={(value) => updateCourseAssignment(index, 'courseId', value)}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map(course => (
                      <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Преподаватель</Label>
                <Select
                  value={assignment.teacherId}
                  onValueChange={(value) => updateCourseAssignment(index, 'teacherId', value)}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTeachers.map(teacher => (
                      <SelectItem key={teacher.id} value={teacher.id}>{teacher.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Дата начала</Label>
                <Input
                  type="date"
                  className="h-9"
                  value={assignment.startDate}
                  onChange={(e) => updateCourseAssignment(index, 'startDate', e.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => removeCourseAssignment(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          {courseAssignments.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Курсы не назначены. Нажмите «Добавить курс» для назначения.
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout title="Админская панель">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск пользователей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => { resetForm(); setIsCreateDialogOpen(true); }}>
            <UserPlus className="w-4 h-4 mr-2" />
            Создать пользователя
          </Button>
        </div>

        {/* Users Table */}
        <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="text-muted-foreground">Имя</TableHead>
                <TableHead className="text-muted-foreground">Фамилия</TableHead>
                <TableHead className="text-muted-foreground">Телефон</TableHead>
                <TableHead className="text-muted-foreground">Электронная почта</TableHead>
                <TableHead className="text-muted-foreground">Роль</TableHead>
                <TableHead className="text-muted-foreground text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const RoleIcon = roleIcons[user.role];
                return (
                  <TableRow key={user.id} className="border-border/30 hover:bg-card/50">
                    <TableCell className="font-medium text-foreground">{user.firstName}</TableCell>
                    <TableCell className="text-foreground">{user.lastName}</TableCell>
                    <TableCell className="text-muted-foreground">{user.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-destructive/20 text-destructive' :
                        user.role === 'teacher' ? 'bg-primary/20 text-primary' :
                        user.role === 'student' ? 'bg-secondary/20 text-secondary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        <RoleIcon className="w-3 h-3" />
                        {roleLabels[user.role]}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openEditDialog(user)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openDeleteDialog(user)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Пользователи не найдены
            </div>
          )}
        </div>
      </div>

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Создать пользователя</DialogTitle>
            <DialogDescription>
              Заполните данные нового пользователя
            </DialogDescription>
          </DialogHeader>
          <UserFormContent />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreateUser}>
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Редактировать пользователя</DialogTitle>
            <DialogDescription>
              Измените данные пользователя
            </DialogDescription>
          </DialogHeader>
          <UserFormContent />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleEditUser}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Удалить пользователя?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить пользователя {selectedUser?.firstName} {selectedUser?.lastName}? 
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default AdminPanel;
