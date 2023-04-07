import { ValidationError } from '../errors/validationError'

class ExtraFeatures {
  public generateBrasilianState (): string {
    const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

    const randomIndex = Math.floor(Math.random() * states.length)

    return states[randomIndex]
  }

  public validateBrasilianState (state: string): boolean {
    const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

    return states.includes(state)
  }

  public generateCEP (): string {
    const cepNumbers: number[] = []
    for (let i = 0; i < 5; i++) {
      cepNumbers.push(Math.floor(Math.random() * 10))
    }
    cepNumbers.push(0, 0, Math.floor(Math.random() * 10))

    return cepNumbers.join('')
  }

  generateCPF (): string {
    const cpf: string[] = []
    for (let i = 0; i < 9; i++) {
      cpf.push(Math.floor(Math.random() * 10).toString())
    }
    cpf.push(this.calculateVerifierDigit(cpf).toString())
    cpf.push(this.calculateVerifierDigit(cpf).toString())
    const formattedCPF: string = cpf.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    return formattedCPF
  }

  validateCPF (formattedCPF: string): boolean {
    const cpf: string = formattedCPF.replace(/[^\d]/g, '')
    if (!cpf || cpf.length !== 11) {
      return false
    }
    if (cpf.match(new RegExp(`${cpf[0]}`, 'g')).length === 11) { // checks if CPF is fake
      return false
    }
    let sum = 0
    let remainder = 0
    const multiplied = 0
    let checkerDigit = 0
    for (let i = 0; i < 9; i++) {
      sum += +cpf[i] * (10 - i)
    }
    remainder = sum % 11
    checkerDigit = remainder < 2 ? 0 : 11 - remainder
    if (checkerDigit !== +cpf[9]) {
      return false
    }

    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += +cpf[i] * (11 - i)
    }
    remainder = sum % 11
    checkerDigit = remainder < 2 ? 0 : 11 - remainder

    if (checkerDigit !== +cpf[10]) {
      return false
    }
    return true
  }

  private calculateVerifierDigit (cpf: string[]): string {
    const sum = cpf.reduce((total, number, index) => {
      return total + +number * (cpf.length + 1 - index)
    }, 0)

    const remainder = sum % 11
    const verifierDigit = 11 - remainder > 9 ? '0' : `${11 - remainder}`
    return verifierDigit
  }
}

export const extraFeatures = new ExtraFeatures()
