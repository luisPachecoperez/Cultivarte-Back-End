import { ExcepcionesController } from '../excepciones-controller';
import { EditarExcepciones, ExcepcionModificable } from '@/domain/entities/excepciones';
import { RespuestaGrap } from '@/domain';

describe('ExcepcionesController', () => {
	let getExcepcionesUseCase: any;
	let persistExcepcionUseCase: any;
	let controller: ExcepcionesController;

	beforeEach(() => {
		getExcepcionesUseCase = { execute: jest.fn() };
		persistExcepcionUseCase = { execute: jest.fn() };
		controller = new ExcepcionesController(getExcepcionesUseCase, persistExcepcionUseCase);
	});

	describe('getExcepciones', () => {
		it('debe retornar un array de excepciones (flujo exitoso)', async () => {
			const excepciones: ExcepcionModificable[] = [
				{ id_excepcion: 1, error: 'E1', mensaje: 'msg' },
			];
			getExcepcionesUseCase.execute.mockResolvedValue(excepciones);
			const result = await controller.getExcepciones();
			expect(result).toEqual(excepciones);
			expect(getExcepcionesUseCase.execute).toHaveBeenCalled();
		});

		it('debe retornar un objeto RespuestaGrap si hay error', async () => {
			const errorResp: RespuestaGrap = { exitoso: 'N', mensaje: 'error' };
			getExcepcionesUseCase.execute.mockResolvedValue(errorResp);
			const result = await controller.getExcepciones();
			expect(result).toEqual(errorResp);
		});

		it('debe propagar excepciones lanzadas', async () => {
			getExcepcionesUseCase.execute.mockRejectedValue(new Error('fail'));
			await expect(controller.getExcepciones()).rejects.toThrow('fail');
		});
	});

	describe('persistExcepcion', () => {
		it('debe retornar RespuestaGrap (flujo exitoso)', async () => {
			const input: EditarExcepciones = { nuevos: [], modificados: [], eliminados: [] };
			const resp: RespuestaGrap = { exitoso: 'S', mensaje: 'ok' };
			persistExcepcionUseCase.execute.mockResolvedValue(resp);
			const result = await controller.persistExcepcion(input);
			expect(result).toEqual(resp);
			expect(persistExcepcionUseCase.execute).toHaveBeenCalledWith(input);
		});

		it('debe propagar excepciones lanzadas', async () => {
			persistExcepcionUseCase.execute.mockRejectedValue(new Error('fail persist'));
			await expect(controller.persistExcepcion({ nuevos: [], modificados: [], eliminados: [] })).rejects.toThrow('fail persist');
		});
	});
});
