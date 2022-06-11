import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private userService: UsersService,
  ) {}

  create(createProfileInput: CreateProfileInput) {
    return this.profileRepository.save({
      user: { id: createProfileInput.userId },
    });
  }

  findAll() {
    return this.profileRepository.find();
  }

  findOne(userId: number) {
    return this.profileRepository.findOneOrFail({ where: { userId } });
  }

  async update(id: number, updateProfileInput: UpdateProfileInput) {
    const profile = await this.profileRepository.findOne(id);
    const { id: profileId, ...rest } = updateProfileInput;
    this.profileRepository.merge(profile, rest);
    return this.profileRepository.save(profile);
  }

  getUser(userId: number) {
    return this.userService.findOne(userId);
  }
}
