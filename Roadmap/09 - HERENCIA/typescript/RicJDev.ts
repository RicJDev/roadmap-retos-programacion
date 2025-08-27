//EJERCICIO
class Animal {
  name: string
  constructor(name: string) {
    this.name = name

    if (new.target === Animal) {
      throw new TypeError('unable to instantiate class "Animal"')
    }
  }

  speak(): void {
    throw new Error('the method "speak()" must be implemented')
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }

  speak(): void {
    console.log(`${this.name}: woof, woof!`)
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name)
  }

  speak(): void {
    console.log(`${this.name}: meow, meow!`)
  }
}

const charlie = new Dog('Charlie')
charlie.speak()

const mike = new Cat('Mike')
mike.speak()

//EXTRA
type Role = 'Manager' | 'Project manager' | 'Programer'

class Employee {
  name: string
  workerID: number
  role: Role

  constructor(name: string, workerID: number, role: Role) {
    this.name = name
    this.workerID = workerID
    this.role = role
  }

  work(): void {
    console.log(`${this.name} is working...`)
  }
}

class Manager extends Employee {
  workers: Set<Employee> = new Set()
  projects: Set<string> = new Set()

  constructor(name: string, workerID: number) {
    super(name, workerID, 'Manager')
  }

  displayWorkersList(): void {
    console.log(`${this.name}'s workers:`)

    this.workers.forEach((worker) => {
      console.log(`- ${worker.name}: ${worker.workerID}. ${worker.role}.`)
    })
  }

  assingProject(projectManager: ProjectManager, project: string): void {
    console.log(`${this.name} assigned the '${project}' project to ${projectManager.name}.`)

    projectManager.currentProject = project
    this.workers.add(projectManager)
    this.projects.add(project)
  }

  cancelProject(projectManager: ProjectManager): void {
    console.log(
      `${this.name} has canceled the project of ${projectManager.name}: ${projectManager.currentProject}.`
    )
    this.workers.delete(projectManager)
    this.projects.delete(projectManager.currentProject)
    projectManager.currentProject = ''
  }
}

class ProjectManager extends Employee {
  workers: Set<Employee> = new Set()
  currentProject: string = ''

  constructor(name: string, workerID: number) {
    super(name, workerID, 'Project manager')
  }

  addWorker(worker: Employee) {
    this.workers.add(worker)

    console.log(`${worker.name} is now working for ${this.name}.`)
  }

  displayWorkersList(): void {
    console.log(`${this.name}'s workers:`)

    this.workers.forEach((worker) => {
      console.log(`- ${worker.name}: ${worker.workerID}. ${worker.role}`)
    })
  }
}

class Programer extends Employee {
  constructor(name: string, workerID: number) {
    super(name, workerID, 'Programer')
  }
}

const manager = new Manager('John', 123)

const projectManager1 = new ProjectManager('Mario', 3321)
/*
const projectManager2 = new ProjectManager('Hector', 4322)
const projectManager3 = new ProjectManager('Lorraine', 1543)

const programer1 = new Programer('Julieta', 12356)
const programer2 = new Programer('Joseph', 32421)
const programer4 = new Programer('Julieta', 89073)
const programer5 = new Programer('Julieta', 12982)
const programer3 = new Programer('Julieta', 35642)
const programer6 = new Programer('Julieta', 51634)
const programer7 = new Programer('Julieta', 22233)
const programer8 = new Programer('Julieta', 12782)
*/

manager.assingProject(projectManager1, 'MechaGrooth Game Studio')
