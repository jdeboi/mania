int main(int argc, char** argv) {
  int a1, a3;
  result_t res;
  int i, rc;

  if (argc !=3) {
    printf("usage: conficker_ports <ip addr> <epoch week>\n");
    exit(0);
  }

  a1 = inet_addr(argv[1]);
  a3 = atoi(argv[2]);

  rc=portgen(a1, &res, a3);
  printf("ports are TCP (fixed), UDP (fixed), TCP (week-dependent), UDP (week-dependent)\n");

  for (i=0; i<8; i++) {
    if(res.u16[i])
      printf("%d\t", res.u16[i]);
  }
  printf("\n");
  return 0;
}
