import { ExcepcionesRepositoryImpl } from '../excepciones-repository-impl';

describe('ExcepcionesRepositoryImpl', () => {
	let dataSource: any;
	let repository: ExcepcionesRepositoryImpl;

	beforeEach(() => {
		dataSource = {
			getExcepciones: jest.fn(),
			UpdateExcepciones: jest.fn(),
		};
		repository = new ExcepcionesRepositoryImpl(dataSource);
	});

	it('debe retornar excepciones (flujo exitoso)', async () => {
		const excepciones = [{ id_excepcion: 1, error: 'E1', mensaje: 'msg' }];
		dataSource.getExcepciones.mockResolvedValue(excepciones);
		const result = await repository.getExcepciones();
		expect(result).toEqual(excepciones);
		expect(dataSource.getExcepciones).toHaveBeenCalled();
	});

	it('debe retornar error si getExcepciones lanza', async () => {
		dataSource.getExcepciones.mockRejectedValue(new Error('fail'));
		await expect(repository.getExcepciones()).rejects.toThrow('fail');
	});

	it('debe actualizar excepciones (flujo exitoso)', async () => {
		const resp = { exitoso: 'S', mensaje: 'ok' };
		dataSource.UpdateExcepciones.mockResolvedValue(resp);
		const input = { nuevos: [], modificados: [], eliminados: [] };
		const result = await repository.UpdateExcepciones(input);
		expect(result).toEqual(resp);
		expect(dataSource.UpdateExcepciones).toHaveBeenCalledWith(input);
	});

	it('debe retornar error si UpdateExcepciones lanza', async () => {
		dataSource.UpdateExcepciones.mockRejectedValue(new Error('fail update'));
		const input = { nuevos: [], modificados: [], eliminados: [] };
		await expect(repository.UpdateExcepciones(input)).rejects.toThrow('fail update');
	});
});
