import { GetExcepcionesUseCaseImpl } from '../../exepciones/get-excepciones';
import { ExcepcionModificable } from '@/domain/entities/excepciones';
import { RespuestaGrap } from '@/domain/entities/respuesta';

describe('GetExcepcionesUseCaseImpl', () => {
	let excepcionesRepository: any;
	let useCase: GetExcepcionesUseCaseImpl;

	beforeEach(() => {
		excepcionesRepository = { getExcepciones: jest.fn() };
		useCase = new GetExcepcionesUseCaseImpl(excepcionesRepository);
	});

	it('debe retornar excepciones (flujo exitoso)', async () => {
		const excepciones: ExcepcionModificable[] = [
			{ id_excepcion: 1, error: 'E1', mensaje: 'msg' },
		];
		excepcionesRepository.getExcepciones.mockResolvedValue(excepciones);
		const result = await useCase.execute();
		expect(result).toEqual(excepciones);
		expect(excepcionesRepository.getExcepciones).toHaveBeenCalled();
	});

	it('debe retornar objeto RespuestaGrap si hay error', async () => {
		const error = new Error('fail');
		excepcionesRepository.getExcepciones.mockImplementation(() => { throw error; });
		const result = await useCase.execute();
		expect(result).toEqual({ exitoso: 'N', mensaje: 'fail' });
	});

	it('debe retornar objeto RespuestaGrap si la promesa es rechazada', async () => {
		excepcionesRepository.getExcepciones.mockRejectedValue(new Error('fail async'));
		const result = await useCase.execute();
		expect(result).toEqual({ exitoso: 'N', mensaje: 'fail async' });
	});

	it('debe retornar objeto RespuestaGrap si error no es instancia de Error', async () => {
		excepcionesRepository.getExcepciones.mockImplementation(() => { throw 'fail string'; });
		const result = await useCase.execute();
		expect(result).toEqual({ exitoso: 'N', mensaje: JSON.stringify('fail string') });
	});
});
