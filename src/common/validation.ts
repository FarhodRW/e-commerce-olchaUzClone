import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UserDefinedError } from '../db/common/common.error';

function pushErrorMessage(error) {
  let messages = []
  if (error.constraints) {
    Object.keys(error.constraints).forEach(key => {
      messages.push({
        field: error.property,
        message: error.constraints[key]
      })
    })
  }
  if (error.children) {
    for (const child of error.children) {
      const child_messages = pushErrorMessage(child)
      messages = messages.concat(child_messages)
    }
  }

  return messages;
}

export async function validateIt<T>(body, classType: ClassConstructor<T>, groups) {
  try {
    const data = plainToClass(classType, body, { excludeExtraneousValues: false });
    await validateOrReject(data as any, { groups, whitelist: true })
    return data;
  } catch (errors: any) {
    console.log('errors', errors);

    let errorMessage: any[] = []
    for (const error of errors) {
      const messages = pushErrorMessage(error);
      errorMessage = errorMessage.concat(messages)
    }
    console.log('messages', errorMessage);

    throw UserDefinedError.ValidationError(errorMessage);
  }
}

