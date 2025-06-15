To open a specific port as a rule:
- sudo ufw allow <port>/<protocol> comment <comment>
ex: sudo ufw allow 3000/tcp comment 'accept http on 3000'

To see rules as numbered list (to help with deleting)
- sudo ufw status numbered

To delete a rule:
- sudo ufw delete <rule-number>