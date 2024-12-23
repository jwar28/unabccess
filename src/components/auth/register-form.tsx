'use client';

import { registerUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { careers } from '@/lib/careers';

import { Combobox } from '../ui/combobox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AuthFormLayout } from './auth-layout';

export const RegisterForm = () => {
	const router = useRouter();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [userId, setUserId] = useState<string>('');
	const [career, setCareer] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleUserCreation = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		if (!email || !password || !name || !lastName || !userId || !career) {
			setError('Por favor llena todos los campos.');
			setLoading(false);
			return;
		}

		try {
			const user = await registerUser(userId, name, lastName, email, password, career);
			if (user) {
				console.log('User created', user);
				router.push('/auth');
			} else {
				setError('Error creando usuario. Por favor intenta de nuevo.');
			}
		} catch (error) {
			setError((error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthFormLayout desc="Crea tu cuenta con estos sencillos datos">
			<form onSubmit={handleUserCreation} className="flex flex-col gap-4">
				<Tabs defaultValue="credentials" className="w-full">
					<TabsList className="grid w-full grid-flow-col grid-cols-2">
						<TabsTrigger value="credentials">Credenciales</TabsTrigger>
						<TabsTrigger value="info">Información</TabsTrigger>
					</TabsList>
					<TabsContent value="credentials">
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Contraseña</Label>
								</div>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">ID</Label>
								</div>
								<Input id="id" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
							</div>
						</div>
					</TabsContent>

					<TabsContent value="info">
						<div className="grid gap-4">
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Nombre</Label>
								</div>
								<Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Apellido</Label>
								</div>
								<Input
									id="lastName"
									type="text"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="career">Carrera</Label>
								</div>

								<Combobox options={careers} value={career} onChange={setCareer} placeholder="carrera" />
							</div>
						</div>
					</TabsContent>
				</Tabs>

				{error && <p className="text-center text-sm text-red-500">{error}</p>}

				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? 'Validando...' : 'Crear cuenta'}
				</Button>
			</form>
		</AuthFormLayout>
	);
};
