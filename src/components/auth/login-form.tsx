'use client';

import { signInWithEmail } from '@/api/auth';
import { getReservationsByUser } from '@/api/reserve-api';
import useAuthStore from '@/hooks/useAuthStore';
import { useReservationsStore } from '@/hooks/useReservationStore'; // Importa el hook de reservas
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { AuthFormLayout } from './auth-layout';

export const LoginForm = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const { setUser, setToken, setLoading, loading } = useAuthStore();
	const { setReservations } = useReservationsStore();
	const router = useRouter();

	const handleEmailLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const user = await signInWithEmail(email, password);

			if (user) {
				setUser(user);
				setToken(await user.getIdToken());
				setReservations(await getReservationsByUser(user.uid));
				router.push('/');
				console.log('Inicio de sesión exitoso:', user);
			} else {
				setError('Error en el inicio de sesión. Verifica tus credenciales.');
			}
		} catch (error) {
			setError('Error en el inicio de sesión. Por favor, inténtalo de nuevo.');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthFormLayout desc="Ingresa tu cuenta para acceder al campus">
			<form onSubmit={handleEmailLogin}>
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
							<Link href="#" className="ml-auto inline-block text-sm underline">
								Olvidaste tu contraseña?
							</Link>
						</div>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <p className="text-center text-sm text-red-500">{error}</p>}
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? 'Validando...' : 'Iniciar sesión'}
					</Button>
				</div>
				<div className="mt-4 text-center text-sm">
					No tienes una cuenta?{' '}
					<Link href="/auth/register" className="underline">
						Registrate
					</Link>
				</div>
			</form>
		</AuthFormLayout>
	);
};
