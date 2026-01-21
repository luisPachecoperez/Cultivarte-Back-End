
import { PersistExcepcionUseCaseImpl } from '../../exepciones/persist-excepcion';
import { EditarExcepciones } from '@/domain/entities/excepciones';
import { RespuestaGrap } from '@/domain/entities/respuesta';

describe('PersistExcepcionUseCaseImpl', () => {
	let excepcionesRepository: any;
	let useCase: PersistExcepcionUseCaseImpl;

	beforeEach(() => {
		excepcionesRepository = { UpdateExcepciones: jest.fn() };
		useCase = new PersistExcepcionUseCaseImpl(excepcionesRepository);
	});

	it('debe retornar RespuestaGrap (flujo exitoso)', async () => {
		const input: EditarExcepciones = { nuevos: [], modificados: [], eliminados: [] };
		const resp: RespuestaGrap = { exitoso: 'S', mensaje: 'ok' };
		excepcionesRepository.UpdateExcepciones.mockResolvedValue(resp);
		const result = await useCase.execute(input);
		expect(result).toEqual(resp);
		expect(excepcionesRepository.UpdateExcepciones).toHaveBeenCalledWith(input);
	});

	it('debe retornar objeto RespuestaGrap si hay error', async () => {
		const input: EditarExcepciones = { nuevos: [], modificados: [], eliminados: [] };
		const error = new Error('fail');
		excepcionesRepository.UpdateExcepciones.mockImplementation(() => { throw error; });
		const result = await useCase.execute(input);
		expect(result).toEqual({ exitoso: 'N', mensaje: 'fail' });
	});

	it('debe retornar objeto RespuestaGrap si la promesa es rechazada', async () => {
		const input: EditarExcepciones = { nuevos: [], modificados: [], eliminados: [] };
		excepcionesRepository.UpdateExcepciones.mockRejectedValue(new Error('fail async'));
		const result = await useCase.execute(input);
		expect(result).toEqual({ exitoso: 'N', mensaje: 'fail async' });
	});

  it('debe retornar objeto RespuestaGrap si error no es instancia de Error', async () => {
		const input: EditarExcepciones = { nuevos: [], modificados: [], eliminados: [] };
		excepcionesRepository.UpdateExcepciones.mockImplementation(() => { throw 'fail string'; });
		const result = await useCase.execute(input);
		expect(result).toEqual({ exitoso: 'N', mensaje: JSON.stringify('fail string') });
	});
});
