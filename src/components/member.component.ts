import {teamMembers} from '../members';
import { IMember } from '../models/members-model';
export default class MemberComponent{

    constructor ()
    {
        this.addMember();
    }
    private addMember() : void {
        const membersListy: Array<IMember> = teamMembers.reverse();
        const teamContainer = document.querySelector('.team-members');
        const modalContainter = document.querySelector('.members-modal');
        membersListy.forEach ( (member: IMember) => {
            teamContainer.insertAdjacentHTML('afterbegin', this.addSingleMember(member));
            modalContainter.insertAdjacentHTML('afterbegin', this.addModalMember(member));
        })
        this.openModal();

    }

    private addSingleMember(member: IMember) : string {

        let imgMember = member.photo ?
        `<img src="${member.photo}" alt="avatar">` :
        ''; 

        let name = member.fullName &&
        `<h4 class="name">${member.fullName}</h4>`;

        let position = member.position &&
                         `<span class="position">${member.position}</span>`;
        let locaization = member.localization && 
                         `<span class="localization">${member.localization}</span>`;

        return `<div class="member-item" data-user-id="${member.id}">
                    <div class="avatar"> 
                        ${imgMember}
                        <a class="email" href="#" onclick="return false;"></a>   
                    </div> 
                    <div class="description">
                        ${name}
                        ${position}
                        ${locaization}
                    </div>
                </div>`;
    }

    private addModalMember (member: IMember): string {
        let position = member.position &&
                         `<span class="position">${member.position}</span>`;
        let name = member.fullName &&
        `<h4 class="name">${member.fullName}</h4>`;        
        return `<div class="member" data-user-id="${member.id}">
                    ${position}
                    ${name}
                </div>`;
    };

    private openModal() : void {
        const member = document.querySelectorAll('.member-item');
        member.forEach((member) =>{
            member.addEventListener('click',()=>{
                (<HTMLElement>document.querySelector('.members-modal')).style.display = "block";
            })
        })
    }

    private preventClick() : void{
        const emails = document.querySelectorAll(".avatar a");
        emails
        e.preventDefault();
        e.stopImmediatePropagation();
    }
}